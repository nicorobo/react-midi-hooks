import { useState, useEffect, useCallback, useContext } from 'react';
import { MIDIFilter, MIDINote } from './types';
import { MIDIContext } from './midi-provider';

export const useMIDINote = ({
  target: noteFilter,
  channel: channelFilter,
}: MIDIFilter = {}) => {
  const { emitter } = useContext(MIDIContext);
  const [value, setValue] = useState<MIDINote | undefined>();

  const handleNote = useCallback(
    (message: any) => {
      const { target: note, value: velocity, on, channel } = message;
      if (
        (!noteFilter || noteFilter === note) &&
        (!channelFilter || channelFilter === channel)
      ) {
        setValue({ note, on, velocity, channel });
      }
    },
    [noteFilter, channelFilter, setValue]
  );

  useEffect(() => {
    const id = emitter.subscribe('note', handleNote);
    return () => {
      emitter.unsubscribe('note', id);
    };
  }, [emitter, handleNote]);

  return value;
};
