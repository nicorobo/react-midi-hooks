import { useState, useEffect } from 'react'
import { MIDINoteFilter, MIDINote } from '../types'
import { useMIDINote } from './use-midi-note'

/**
 * Hook to manage an array of MIDI note messages that match a given filter.
 *
 * This hook subscribes to MIDI note messages that satisfy specified filtering criteria (such as note number and channel).
 * It maintains an array of active (i.e., currently pressed) MIDI notes. When a note-on message is received, the note is
 * added to the array. When a note-off message for an active note is received, that note is removed from the array.
 * This allows for tracking of currently active MIDI notes that match the filter.
 *
 * @param {MIDINoteFilter} [filter={}] - An object specifying the filtering criteria for MIDI note messages.
 *        This can include properties like `note` (to filter by MIDI note number) and `channel` (to filter by MIDI channel).
 *
 * @returns {MIDINote[]} An array of MIDI notes that are currently active (i.e., note-on messages have been received,
 *         but corresponding note-off messages have not yet been received) and match the specified filter. Each
 *         element in the array is an object representing a MIDI note message, including properties like the note number,
 *         velocity, and channel.
 *
 * @example
 * // To use this hook to monitor active notes for MIDI channel 1
 * const activeNotes = useMIDINotes({ channel: 1 });
 * // activeNotes will be an array of objects, each representing an active MIDI note on channel 1.
 */

export const useMIDINotes = (filter: MIDINoteFilter = {}) => {
  const [notes, setNotes] = useState<MIDINote[]>([])
  const value = useMIDINote(filter)
  useEffect(() => {
    if (value) {
      if (value === notes[notes.length - 1]) {
        return
      }
      if (value.on && value.velocity !== 0) {
        setNotes([...notes, value])
      } else {
        setNotes(notes.filter((n) => n.note !== value.note))
      }
    }
  }, [value])
  return notes
}
