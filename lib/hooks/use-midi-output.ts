import { MIDIConstants } from '../constants'
import { useMIDIOutputs } from './use-midi-outputs'

type SingleNote = number
type MultipleNotes = number[]
export type MultipleNotesWithOptions = {
  note: number
  velocity?: number
  channel?: number
}[]

type NoteInput = SingleNote | MultipleNotes | MultipleNotesWithOptions

type NoteOptions = {
  velocity?: number
  channel?: number
}

/**
 * Hook to interact with a MIDI output device.
 *
 * This hook provides methods to send MIDI messages (note on, note off, and control change) to the selected MIDI output.
 * It simplifies the process of sending MIDI messages by abstracting the details of constructing MIDI message arrays.
 *
 * @returns {Object} An object containing the methods to interact with the MIDI output:
 *  - noteOn: Function to send a 'note on' message for one or more notes.
 *  - noteOff: Function to send a 'note off' message for one or more notes.
 *  - cc: Function to send a control change message.
 *
 * @example
 * // To use this hook in a component to send a 'note on' and 'note off' message
 * const { noteOn, noteOff, cc } = useMIDIOutput();
 * noteOn(60, { velocity: 127, channel: 1 }); // Send 'note on' for note 60 with velocity 127 on channel 1
 * noteOff(60, { channel: 1 }); // Send 'note off' for note 60 on channel 1
 * cc(64, 127, 1); // Send control change message with control number 64, value 127, on channel 1
 */

export const useMIDIOutput = () => {
  const { output } = useMIDIOutputs()
  if (!output) return {}

  const noteOn = (noteInput: NoteInput, options?: NoteOptions) => {
    const messages = getNoteMessages({
      type: MIDIConstants.noteOn,
      noteInput,
      ...options,
    })
    output.send(messages)
  }

  const noteOff = (noteInput: NoteInput, options?: NoteOptions) => {
    const messages = getNoteMessages({
      type: MIDIConstants.noteOff,
      noteInput,
      ...options,
    })
    output.send(messages)
  }

  const cc = (value: number, control = 0x14, channel = 1) => {
    const ccAndChannel = MIDIConstants.cc | getChannel(channel)
    output.send([ccAndChannel, control, value])
  }

  return { noteOn, noteOff, cc }
}

type GetNoteMessagesArgs = { type: number; noteInput: NoteInput } & NoteOptions
const getNoteMessages = ({
  type,
  noteInput,
  velocity = 127,
  channel = 1,
}: GetNoteMessagesArgs) => {
  const defaultChannelData = type | getChannel(channel)
  if (typeof noteInput === 'number') {
    return [defaultChannelData, noteInput, velocity]
  } else {
    return noteInput.reduce((messages, note) => {
      if (typeof note === 'number') {
        messages.push(defaultChannelData, note, velocity)
      } else {
        messages.push(
          note.channel ? type | getChannel(note.channel) : defaultChannelData,
          note.note,
          note.velocity ?? velocity
        )
      }
      return messages
    }, [] as number[])
  }
}

const getChannel = (channel: number) => {
  if (channel < 1 || channel > 16) return 0 //Channel 1
  return channel - 1
}
