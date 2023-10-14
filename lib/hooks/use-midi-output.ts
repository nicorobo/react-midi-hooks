import { MIDIConstants } from '../constants';
import { useMIDIOutputs } from './use-midi-outputs';

type SingleNote = number;
type MultipleNotes = number[];
type MultipleNotesWithOptions = {
  note: number;
  velocity?: number;
  channel?: number;
}[];

type NoteInput = SingleNote | MultipleNotes | MultipleNotesWithOptions;

type NoteOptions = {
  velocity?: number;
  channel?: number;
};

export const useMIDIOutput = () => {
  const { output } = useMIDIOutputs();
  if (!output) return {};

  const noteOn = (noteInput: NoteInput, options?: NoteOptions) => {
    const messages = getNoteMessages({
      type: MIDIConstants.noteOn,
      noteInput,
      ...options,
    });
    output.send(messages);
  };

  const noteOff = (noteInput: NoteInput, options?: NoteOptions) => {
    const messages = getNoteMessages({
      type: MIDIConstants.noteOff,
      noteInput,
      ...options,
    });
    output.send(messages);
  };

  const cc = (value: number, control = 0x14, channel = 1) => {
    const ccAndChannel = MIDIConstants.cc | getChannel(channel);
    output.send([ccAndChannel, control, value]);
  };

  return { noteOn, noteOff, cc };
};

type GetNoteMessagesArgs = { type: number; noteInput: NoteInput } & NoteOptions;
const getNoteMessages = ({
  type,
  noteInput,
  velocity = 127,
  channel = 1,
}: GetNoteMessagesArgs) => {
  const defaultChannelData = type | getChannel(channel);
  if (typeof noteInput === 'number') {
    return [defaultChannelData, noteInput, velocity];
  } else {
    return noteInput.reduce((messages, note) => {
      if (typeof note === 'number') {
        messages.push(defaultChannelData, note, velocity);
      } else {
        messages.push(
          note.channel ? type | getChannel(note.channel) : defaultChannelData,
          note.note,
          note.velocity ?? velocity
        );
      }
      return messages;
    }, [] as number[]);
  }
};

const getChannel = (channel: number) => {
  if (channel < 1 || channel > 16) return 0; //Channel 1
  return channel - 1;
};
