# @react-midi/hooks

This package provides hooks for working with MIDI in your React app.

```
npm install --save @react-midi/hooks
// or
yarn add @react-midi/hooks
```

### `useMIDI()`

`useMidi()` requests midi access using the browser's web midi api.
It returns an array of inputs, an array of outputs, and a boolean `hasMIDI` that is set to true if your browser supports midi. The inputs and outputs are updated anytime a change to their connection is made (for example, if an input or output is disconnected or a connection is opened).

```js
const { inputs, outputs, hasMIDI } = useMIDI(); // Initially returns [[], []]
```

### `useMIDINote(input, {note?, channel?}?)`

`useMIDINote()` subscribes to both note on and note off midi messages, optionally filtered by note and/or channel.
It returns an object `{on, note, velocity, channel}` reflecting the received midi message, updating when a new relevant message is received.

- `on` will be `true` for note on, and `false` for note off
- `note` will be a MIDI number (60 = C4)
- `velocity` will be an integer between 0 - 127

```js
const App = () => {
  const { inputs, outputs } = useMIDI();
  if (inputs.length < 1) return <div>No MIDI Inputs</div>;
  return <MIDINoteLog input={inputs[0]} />;
};

const MIDINoteLog = ({ input }) => {
  const event = useMIDINote(input, { channel: 1 }); // Intially returns undefined
  if (!event) {
    return <div>Waiting for note...</div>;
  }
  const { on, note, velocity, channel } = event;
  return (
    <div>
      Note {note} {on ? 'on' : 'off'} ({velocity}) on channel {channel}
    </div>
  );
};
```

### `useMIDIControl(input, {control?, channel?}?)`

`useMIDIControl()` subscribes to a control change midi message, optionally filtered by control and/or channel.
It returns an object `{value, control, channel}` reflecting the received midi message, updating when a new relevant message is received.

```js
const App = () => {
  const [inputs, outputs] = useMIDI();
  if (inputs.length < 1) return <div>No MIDI Inputs</div>;
  return <MIDIControlLog input={inputs[0]} />;
};

const MIDIControlLog = ({ input }) => {
  const control = useMIDIControl(input, { control: 15, channel: 1 }); // Initially returns {value: 0, control, channel}
  return <div>Value: {control.value}</div>;
};
```

### `useMIDIClock(input, division?)`

`useMIDIClock()` subscribes to the midi clock messages of a given input, with the option to specify a division.
It returns the number of steps that have occured since the hook began receiving midi clock messages, as well as the play state.

The division argument can be used to update `steps` only when the number of steps recieved is evenly divisible by given `division`.
A midi clock message is received 24 times for every quarter note, so if you only wanted to count quarter notes, you could use `useMIDIClock(input, 24)`

The play state is updated when the input receives a midi play or stop message.
The steps are reset when the input receives a midi stop message.

```js
const App = () => {
  const [inputs, outputs] = useMIDI();
  if (inputs.length < 1) return <div>No MIDI Inputs</div>;
  return <MIDIClock input={inputs[0]} />;
};

const MIDIClock = ({ input }) => {
  const [step, isPlaying] = useMIDIClock(input, 12); // initially return [0, false]
  return <div>Eight notes since starting: {step}</div>;
};
```

### `useMIDIControls(input, controls, {channel?}?)`

`useMIDIControls()` subscribes to multiple control change midi message, optionally filtered by channel.
It returns an array of integers representing the value of controls passed in with the `controls` argument, updating when a new relevant message is received.

```js
const App = () => {
  const { inputs } = useMIDI();
  if (inputs.length < 1) return <div>No MIDI Inputs</div>;
  return <MIDIControlLog input={inputs[0]} />;
};

const MIDIControlLog = ({ input }) => {
  const controls = [13, 14, 15];
  const values = useMIDIControls(input, controls, { channel: 1 }); // Intially returns [0, 0, 0]
  return (
    <div>
      {controls.map((control) => (
        <div>
          Control {control}: {values[control]}
        </div>
      ))}
    </div>
  );
};
```

### `useMIDINotes(input, {channel?}?)`

`useMIDINotes()` subscribes to both note on and note off midi messages, optionally filtered channel.
It returns an array of active note objects (see above), updating when notes are played or released.

```js
const App = () => {
  const { inputs } = useMIDI();
  if (inputs.length < 1) return <div>No MIDI Inputs</div>;
  return <MIDINoteLog input={inputs[0]} />;
};

const MIDINoteLog = ({ input }) => {
  const notes = useMIDINotes(input, { channel: 1 }); // Intially returns []
  return (
    <div>
      Playing notes: {notes.map((n) => n.note).join(', ')} // Playing notes: 60,
      72, 80
    </div>
  );
};
```

### `useMIDIMessage(input)`

`useMIDIMessage()` subscribes to the general midi message handler of a given input, updating everytime a message is received.

```js
const App = () => {
  const { inputs } = useMIDI();
  if (inputs.length < 1) return <div>No MIDI Inputs</div>;
  return <MIDILog input={inputs[0]} />;
};

const MIDINoteLog = ({ input }) => {
  const message = useMIDIMessage(input); // initially return {}
  return <div>Message Data: {message.data ? message.data.join(', ') : ''}</div>;
};
```

### `useMIDIOutput(output)`

`useMIDIOutput()` returns functions that can be used to send messages to the given output.

- `noteOn(note, velocity=127, channel=1)`: Sends a note on message to the output, defaulting to a velocity of 127 and channel 1.
- `noteOff(note, velocity=127, channel=1)`: Sends a note of message to the output, defaulting to a velocity of 127 and channel 1.
- `cc(value, control, channel=1)`: Sends a midi cc (control change) message to the output, defaulting to channel 1.

```js
const App = () => {
  const { outputs } = useMIDI();
  if (outputs.length < 1) return <div>No MIDI Outputs</div>;
  return <MIDIButton output={outputs[0]} />;
};

const MIDIButton = ({ output }) => {
  const { noteOn, noteOff } = useMIDIOutput(output);
  const handleClick = () => {
    noteOn(60); // Play middle C, using velocity and channel defaults
    setTimeout(() => noteOff(60), 200); // Wait 200ms and then trigger note off.
  };
  return <button onClick={handleClick}>Play C3</button>;
};
```

### `useMIDIConnectionManager(connections)`

Given an array of connections (inputs or outputs), `useMIDIConnectionManager()` returns the first avaliable connection, as well as a function to change the connection by calling it with a connection id.

If a connection is no longer avaliable, or an unavailable id is given, the first avaliable connection will be returned.
The functions returned can be used to create a selection UI, or used with `<MIDIConnectionManager />` from [@react-midi/components](https://github.com/nickroberts404/react-midi-components).

```js
const App = () => {
  const { inputs, outputs } = useMIDI();
  const [input, setInputId] = useMIDIConnectionManager(inputs);
  const [output, setOutputId] = useMIDIConnectionManager(outputs);
};
```
