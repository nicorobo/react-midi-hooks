import { useState, useEffect } from 'react';
import { Input, MIDIFilter, MIDINote } from './types';
import { useMIDINote } from './use-midi-Note';
import { useConnectInput } from './use-connect-input';

export const useMIDINotes = (input: Input, filter: MIDIFilter = {}) => {
  useConnectInput(input);
  const [notes, setNotes] = useState<MIDINote[]>([]);
  const value = useMIDINote(input, filter);
  useEffect(() => {
    if (!input) return;
    if (value.on) setNotes([...notes, value]);
    else setNotes(notes.filter((n) => n.note !== value.note)); // Note off, remove note from array (maybe check for channel?)
  }, [input, value]);
  return notes;
};
