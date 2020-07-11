import { useState, useEffect } from 'react';
import { MIDIFilter, MIDINote } from './types';
import { useMIDINote } from './use-midi-note';

// TODO get this to work with mutiple channels
export const useMIDINotes = (filter: MIDIFilter = {}) => {
  const [notes, setNotes] = useState<MIDINote[]>([]);
  const value = useMIDINote(filter);
  useEffect(() => {
    if (value === notes[notes.length - 1]) {
      return;
    }
    if (value.on) {
      setNotes([...notes, value]);
    } else {
      setNotes(notes.filter((n) => n.note !== value.note));
    }
  }, [value]);
  return notes;
};
