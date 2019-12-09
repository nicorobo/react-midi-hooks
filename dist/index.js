var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useState, useEffect } from 'react';
import { useConnectInput } from './use-connect-input';
import uniqid from 'uniqid';
export * from './use-midi';
export var useMIDIClock = function (input, division) {
    if (division === void 0) { division = 1; }
    useConnectInput(input);
    var _a = useState(0), step = _a[0], setStep = _a[1];
    var _b = useState(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var handleClockMessage = function () {
        // Keep track of count through closure. Is there a better way?
        var steps = 0;
        return function (type) {
            switch (type) {
                case 0x08:
                    steps++;
                    if (division === 1)
                        setStep(steps);
                    else if (steps % division === 0)
                        setStep(Math.floor(steps / division));
                    break;
                case 0x0a:
                    setIsPlaying(true);
                    break;
                case 0x0c:
                    steps = 0;
                    setIsPlaying(false);
                    setStep(0);
                    break;
                default:
                    break;
            }
        };
    };
    useEffect(function () {
        if (!input)
            return function () { };
        var id = uniqid();
        input.clockListeners[id] = handleClockMessage();
        return function () { return delete input.clockListeners[id]; };
    }, [input]);
    return [step, isPlaying];
};
export var useMIDIMessage = function (input) {
    useConnectInput(input);
    var _a = useState({}), message = _a[0], setMessage = _a[1];
    var handleMessage = function (message) {
        setMessage(message);
    };
    useEffect(function () {
        if (!input)
            return function () { };
        var id = uniqid();
        input.messageListeners[id] = handleMessage;
        return function () { return delete input.messageListeners[id]; };
    }, [input]);
    return message;
};
export var useMIDIControl = function (input, _a) {
    var _b = _a === void 0 ? {} : _a, control = _b.control, channel = _b.channel;
    useConnectInput(input);
    var _c = useState({ value: 0, control: control, channel: channel }), value = _c[0], setValue = _c[1];
    var handleControlMessage = function (value, cntrl, chan) {
        if ((!control || control === cntrl) && (!channel || channel === chan)) {
            setValue({ value: value, control: cntrl, channel: chan });
        }
    };
    useEffect(function () {
        if (!input)
            return function () { }; // No input provided, return noop
        var id = uniqid();
        input.controlListeners[id] = handleControlMessage;
        return function () { return delete input.controlListeners[id]; };
    }, [input, control, channel]);
    return value;
};
export var useMIDIControls = function (input, controls, filter) {
    if (filter === void 0) { filter = {}; }
    useConnectInput(input);
    var _a = useState(controls.map(function (c) { return 0; })), values = _a[0], setValues = _a[1];
    var value = useMIDIControl(input, filter);
    useEffect(function () {
        if (!input)
            return function () { }; // No input provided, return noop
        var targetIndex = controls.indexOf(value.control);
        if (targetIndex > -1)
            setValues(values.map(function (v, i) { return (i === targetIndex ? value.value : v); }));
    }, [value]);
    return values;
};
export var useMIDINote = function (input, _a) {
    var _b = _a === void 0 ? {} : _a, note = _b.note, channel = _b.channel;
    useConnectInput(input);
    var _c = useState(), value = _c[0], setValue = _c[1];
    var handleNoteOnMessage = function (value, velocity, chan) {
        if ((!note || value === note) && (!channel || channel === chan)) {
            setValue({ note: value, on: true, velocity: velocity, channel: channel });
        }
    };
    var handleNoteOffMessage = function (value, velocity, chan) {
        if ((!note || value === note) && (!channel || channel === chan)) {
            setValue({ note: value, on: false, velocity: velocity, channel: channel });
        }
    };
    useEffect(function () {
        if (!input)
            return function () { }; // No input provided, return noop
        var id = uniqid();
        input.noteOnListeners[id + "-on"] = handleNoteOnMessage;
        input.noteOffListeners[id + "-off"] = handleNoteOffMessage;
        return function () {
            delete input.noteOnListeners[id + "-on"];
            delete input.noteOffListeners[id + "-off"];
        };
    }, [input, note]);
    return value;
};
export var useMIDINotes = function (input, filter) {
    if (filter === void 0) { filter = {}; }
    useConnectInput(input);
    var _a = useState([]), notes = _a[0], setNotes = _a[1];
    var value = useMIDINote(input, filter);
    useEffect(function () {
        if (!input)
            return function () { }; // No input provided, return noop
        if (value.on)
            setNotes(__spreadArrays(notes, [value]));
        //Note on, add note to array
        else
            setNotes(notes.filter(function (n) { return n.note !== value.note; })); // Note off, remove note from array (maybe check for channel?)
    }, [value]);
    return notes;
};
export var useMIDIOutput = function (output) {
    if (!output)
        return {};
    var noteOn = function (note, velocity, channel) {
        if (velocity === void 0) { velocity = 127; }
        if (channel === void 0) { channel = 1; }
        var noteOnAndChannel = 0x90 | getChannel(channel);
        output.send([noteOnAndChannel, note, velocity]);
    };
    var noteOff = function (note, velocity, channel) {
        if (velocity === void 0) { velocity = 127; }
        if (channel === void 0) { channel = 1; }
        var noteOffAndChannel = 0x80 | getChannel(channel);
        output.send([noteOffAndChannel, note, velocity]);
    };
    var cc = function (value, control, channel) {
        if (control === void 0) { control = 0x14; }
        if (channel === void 0) { channel = 1; }
        var ccAndChannel = 0xb0 | getChannel(channel);
        output.send([ccAndChannel, control, value]);
    };
    return { noteOn: noteOn, noteOff: noteOff, cc: cc };
};
var getChannel = function (channel) {
    if (channel < 1 || channel > 16)
        return 0; //Channel 1
    return channel - 1;
};
//# sourceMappingURL=index.js.map