import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

export const useMIDI = () => {
	const [connections, changeConnections] = useState({
		inputs: [],
		outputs: [],
	});
	useEffect(() => {
		navigator.requestMIDIAccess().then((access) => {
			changeConnections({
				inputs: enrichInputs([...access.inputs.values()]),
				outputs: [...access.outputs.values()],
			});
			access.onstatechange = (e) => {
				changeConnections({
					inputs: enrichInputs([...access.inputs.values()]),
					outputs: [...access.outputs.values()],
				});
			};
		});
	}, []);
	return [connections.inputs, connections.outputs];
};

// If listeners were kept in a general .listeners field then 100 functions listening for a noteOn event would get
// called for every clock tick. I imagine this would affect performance. There must be a better way than this as well!
function handleMIDIMessage(message) {
	const action = message.data[0] & 0xf0; // Mask channel/least significant bits;
	const leastSig = message.data[0] & 0x0f; // Mask action bits;
	for (const key in this.messageListeners) {
		this.messageListeners[key](message); // (value, control, channel)
	}
	switch (action) {
		case 0xb0:
			for (const key in this.controlListeners) {
				this.controlListeners[key](message.data[2], message.data[1], leastSig + 1); // (value, control, channel)
			}
			break;
		case 0x90:
			for (const key in this.noteOnListeners) {
				this.noteOnListeners[key](message.data[1], message.data[2], leastSig + 1); // (note, velocity, channel)
			}
			break;
		case 0x80:
			for (const key in this.noteOffListeners) {
				this.noteOffListeners[key](message.data[1], message.data[2], leastSig + 1); // (note, velocity, channel)
			}
			break;
		case 0xf0:
			for (const key in this.clockListeners) {
				this.clockListeners[key](leastSig); // (type)
			}
			break;
		default:
			break;
	}
}

// Listeners can be added/deleted from individual inputs.
// This allows an input to have multiple 'onmidimessage' functions instead of setting/resetting one
const enrichInputs = (inputs) =>
	// Remeber that this is only adding properties to the input object, not really returning a new object.
	// This is a side effect that may present bugs/complications down the line.
	inputs.map((input) => {
		input.clockListeners = input.clockListeners || {};
		input.noteOnListeners = input.noteOnListeners || {};
		input.noteOffListeners = input.noteOffListeners || {};
		input.controlListeners = input.controlListeners || {};
		input.messageListeners = input.messageListeners || {};
		input.onmidimessage = handleMIDIMessage;
		return input;
	});

export const useMIDIClock = (input, division = 1) => {
	const [step, setStep] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	useEffect(() => {
		const id = uniqid();
		const handleClockMessage = () => {
			// Keep track of count through closure. Is there a better way?
			let steps = 0;
			return (type) => {
				if (type === 0x08) {
					steps++;
					if (division === 1) setStep(steps);
					else if (steps % division === 0) setStep(Math.floor(steps / division));
				} else if (type === 0x0a) setIsPlaying(true);
				else if (type === 0x0c) {
					steps = 0;
					setIsPlaying(false);
					setStep(0);
				}
			};
		};
		input.clockListeners[id] = handleClockMessage();
		return () => delete input.clockListeners[id];
	}, [input]);
	return [step, isPlaying];
};

export const useMIDIMessage = (input) => {
	const [message, setMessage] = useState({});
	const handleMessage = (message) => {
		setMessage(message);
	};
	useEffect(() => {
		const id = uniqid();
		input.messageListeners[id] = handleMessage;
		return () => delete input.messageListeners[id];
	}, [input]);
	return message;
};

export const useMIDIControl = (input, { control, channel } = {}) => {
	const [value, setValue] = useState({ value: 0, control, channel });
	const handleControlMessage = (value, cntrl, chan) => {
		if ((!control || control === cntrl) && (!channel || channel === chan)) {
			setValue({ value, control: cntrl, channel: chan });
		}
	};

	useEffect(() => {
		if (!input) return () => {}; // No input provided, return noop
		const id = uniqid();
		input.controlListeners[id] = handleControlMessage;
		return () => delete input.controlListeners[id];
	}, [input, control]);
	return value;
};

export const useMIDIControls = (input, controls, filter = {}) => {
	const [values, setValues] = useState(controls.map((c) => 0));
	const value = useMIDIControl(input, filter);
	useEffect(() => {
		if (!input) return () => {}; // No input provided, return noop
		const targetIndex = controls.indexOf(value.control);
		if (targetIndex > -1)
			setValues(values.map((v, i) => (i === targetIndex ? value.value : v)));
	}, [value]);
	return values;
};

export const useMIDINote = (input, { note, channel } = {}) => {
	const [value, setValue] = useState({});
	const handleNoteOnMessage = (value, velocity, chan) => {
		if ((!note || value === note) && (!channel || channel === chan)) {
			setValue({ note: value, on: true, velocity, channel });
		}
	};
	const handleNoteOffMessage = (value, velocity, chan) => {
		if ((!note || value === note) && (!channel || channel === chan)) {
			setValue({ note: value, on: false, velocity, channel });
		}
	};
	useEffect(() => {
		if (!input) return () => {}; // No input provided, return noop
		const id = uniqid();
		input.noteOnListeners[`${id}-on`] = handleNoteOnMessage;
		input.noteOffListeners[`${id}-off`] = handleNoteOffMessage;
		return () => {
			delete input.noteOnListeners[`${id}-on`];
			delete input.noteOffListeners[`${id}-off`];
		};
	}, [input, note]);
	return value;
};

export const useMIDINotes = (input, filter = {}) => {
	const [notes, setNotes] = useState([]);
	const value = useMIDINote(input, filter);
	useEffect(() => {
		if (!input) return () => {}; // No input provided, return noop
		if (value.on) setNotes([...notes, value]);
		//Note on, add note to array
		else setNotes(notes.filter((n) => n.note !== value.note)); // Note off, remove note from array (maybe check for channel?)
	}, [value]);
	return notes;
};

export const useMIDIOutput = (output) => {
	if (!output) return {};
	const noteOn = (note, velocity = 127, channel = 1) => {
		const noteOnAndChannel = 0x90 | getChannel(channel);
		output.send([noteOnAndChannel, note, velocity]);
	};
	const noteOff = (note, velocity = 127, channel = 1) => {
		const noteOffAndChannel = 0x80 | getChannel(channel);
		output.send([noteOffAndChannel, note, velocity]);
	};
	const cc = (value, control = 0x14, channel = 1) => {
		const ccAndChannel = 0xb0 | getChannel(channel);
		output.send([ccAndChannel, control, value]);
	};
	return { noteOn, noteOff, cc };
};

const getChannel = (channel) => {
	if (channel < 1 || channel > 16) return 0; //Channel 1
	return channel - 1;
};
