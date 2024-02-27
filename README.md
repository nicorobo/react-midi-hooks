# @react-midi/hooks

This package provides hooks for building MIDI-capable React applications and components.

```
npm install --save @react-midi/hooks
```

## `<MIDIProvider>`

The `MIDIProvider` component serves as the cornerstone of our MIDI integration, enabling seamless interaction with MIDI devices directly within your React application. By leveraging the Web MIDI API, `MIDIProvider` offers a comprehensive solution for managing MIDI connections, inputs, outputs, and real-time MIDI events, all within a reactively designed context.

`MIDIProvider` is a prerequisite for utilizing any of the other MIDI-related hooks within our library, as they depend on the context it establishes to function correctly.

### Getting Started:

To begin working with `@react-midi/hooks`, wrap your component tree with `MIDIProvider`:

```ts
import { MIDIProvider } from '@react-midi/hooks'

function App() {
  return (
    <MIDIProvider>
      <YourMIDIEnabledComponent />
    </MIDIProvider>
  )
}
```

## `useMIDIInputs()`:

The `useMIDIInputs` hook is designed to simplify the process of accessing and managing MIDI input devices. It provides an interface for obtaining the list of available MIDI inputs, identifying the currently selected input device, and selecting an input device by its ID.

```ts
const { input, inputs, selectInput, selectedInputId } = useMIDIInputs()

// Example: Select a MIDI input by ID
selectInput('desired-input-device-id')
```

## `useMIDIOutputs()`:

The `useMIDIOutputs` hook is almost the exact same as `useMIDIInputs`, but handles MIDI outputs instead. It provides an interface for obtaining the list of available MIDI outputs, identifying the currently selected output device, and selecting an output device by its ID.

```ts
const { output, outputs, selectOutput, selectedOutputId } = useMIDIOutputs()

// Example: Select a MIDI output by ID
selectInput('desired-output-device-id')
```

## `useMIDIOutput()`:

The `useMIDIOutput` hook provides methods to send MIDI messages (note on, note off, and control change) to the selected MIDI output.
It simplifies the process of sending MIDI messages by abstracting the details of constructing MIDI message arrays.

```ts
// To use this hook in a component to send a 'note on' and 'note off' message
const { noteOn, noteOff, cc } = useMIDIOutput()
noteOn(60, { velocity: 127, channel: 1 }) // Send 'note on' for note 60 with velocity 127 on channel 1
noteOff(60, { channel: 1 }) // Send 'note off' for note 60 on channel 1
cc(64, 127, 1) // Send control change message with control number 64, value 127, on channel 1
```

## `useMIDINote()`:

The `useMIDINote` hook allows you to listen for MIDI note messages and updates its state
with the message details if the message matches the specified note and channel filters. If no filters are provided, it will update the state with every note message received.

```ts
// To use this hook to listen for note C3 (MIDI note number 60) on channel 1
const midiNote = useMIDINote({ note: 60, channel: 1 })
if (midiNote) {
  console.log(
    `Note ${midiNote.note} with velocity ${midiNote.velocity} received on channel ${midiNote.channel}`
  )
}
```

## `useMIDINotes()`:

The `useMIDINotes` hook subscribes to MIDI note messages that satisfy specified filtering criteria (such as note number and channel).
It maintains an array of active (i.e., currently pressed) MIDI notes. When a note-on message is received, the note is
added to the array. When a note-off message for an active note is received, that note is removed from the array.
This allows for tracking of currently active MIDI notes that match the filter.

```ts
// To use this hook to monitor active notes for MIDI channel 1
const activeNotes = useMIDINotes({ channel: 1 })
// activeNotes will be an array of objects, each representing an active MIDI note on channel 1.
```

## `useMIDIControl()`:

The `useMIDIControl` hook listens for MIDI control change (CC) messages and updates its state
with the details of the message if it matches the specified control number and channel filters.
If no filters are provided, it will update the state with every control change message received.
This can be useful for components that need to react to specific control change messages.

```ts
// To use this hook to listen for control change number 7 on channel 1
const midiControl = useMIDIControl({ cc: 7, channel: 1 })
if (midiControl) {
  console.log(
    `Control change ${midiControl.control} with value ${midiControl.value} received on channel ${midiControl.channel}`
  )
}
```

## `useMIDIControls()`:

The `useMIDIControls` hook listens for MIDI control change messages that match a provided filter,
and maintains an array of values corresponding to a predefined set of control numbers (`controls`). Each control's
value in the array is updated when a matching control change message is received. This is useful for components
that need to keep track of and react to changes in multiple MIDI control values simultaneously.

```ts
// To use this hook to monitor control changes for MIDI controls 7 and 10 on channel 1
const controlValues = useMIDIControls([7, 10], { channel: 1 })
// controlValues will be an array of two numbers, initially [0, 0], updated with the latest values for controls 7 and 10.
```

## `useMIDIMessage()`:

The `useMIDIMessage` hook listens for any MIDI messages and updates its state with the latest message received.
It is useful for components that need to react to or display information based on incoming MIDI messages.

```ts
// To use this hook in a component to display the latest MIDI message
const midiMessage = useMIDIMessage()
if (midiMessage) {
  console.log(`MIDI message received:`, midiMessage)
}
```
