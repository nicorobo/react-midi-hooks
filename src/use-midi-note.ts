import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { Input, Message, MIDIFilter, MIDINote } from './types';
import { useConnectInput } from './use-connect-input';

export const useMIDINote = (
  input: Input,
  { target: noteFilter, channel: channelFilter }: MIDIFilter = {}
) => {
  useConnectInput(input);
  const [value, setValue] = useState<MIDINote | undefined>();
  const handleNoteOnMessage = (message: Message) => {
    const { target: note, value: velocity, channel } = message;
    if (
      (!noteFilter || noteFilter === note) &&
      (!channelFilter || channelFilter === channel)
    ) {
      setValue({ note, on: true, velocity, channel });
    }
  };
  const handleNoteOffMessage = (message: Message) => {
    const { target: note, value: velocity, channel } = message;
    if (
      (!noteFilter || noteFilter === note) &&
      (!channelFilter || channelFilter === channel)
    ) {
      setValue({ note, on: false, velocity, channel });
    }
  };
  useEffect(() => {
    if (!input) return;
    const id = uniqid();
    input.noteOnListeners[`${id}-on`] = handleNoteOnMessage;
    input.noteOffListeners[`${id}-off`] = handleNoteOffMessage;
    return () => {
      delete input.noteOnListeners[`${id}-on`];
      delete input.noteOffListeners[`${id}-off`];
    };
  }, [input]);
  return value;
};
