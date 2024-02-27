import { useState, useCallback } from 'react'
import { MIDINote, MIDINoteFilter, NoteMessage } from '../types'
import { useSubscribe } from './use-subscribe'

/**
 * Hook to subscribe to MIDI note messages that match specified filters.
 *
 * This hook allows you to listen for MIDI note messages and updates its state
 * with the message details if the message matches the specified note and channel filters.
 * If no filters are provided, it will update the state with every note message received.
 *
 * @param {MIDINoteFilter} [filters={}] - The filters to apply to incoming MIDI note messages.
 * @param {number} [filters.note] - The MIDI note number to filter messages by.
 * @param {number} [filters.channel] - The MIDI channel number to filter messages by.
 *
 * @returns {MIDINote | undefined} - The latest MIDI note message that matches the filters,
 *                                   or `undefined` if no message has matched the filters yet.
 *
 * @example
 * // To use this hook to listen for note C3 (MIDI note number 60) on channel 1
 * const midiNote = useMIDINote({ note: 60, channel: 1 });
 * if (midiNote) {
 *   console.log(`Note ${midiNote.note} with velocity ${midiNote.velocity} received on channel ${midiNote.channel}`);
 * }
 */

export const useMIDINote = ({
  note: noteFilter,
  channel: channelFilter,
}: MIDINoteFilter = {}): MIDINote | undefined => {
  const [value, setValue] = useState<MIDINote | undefined>()

  const handleNote = useCallback(
    (message: NoteMessage) => {
      const { target: note, value: velocity, on, channel } = message
      if (
        (!noteFilter || noteFilter === note) &&
        (!channelFilter || channelFilter === channel)
      ) {
        setValue({ note, on, velocity, channel })
      }
    },
    [noteFilter, channelFilter, setValue]
  )
  useSubscribe('note', handleNote)

  return value
}
