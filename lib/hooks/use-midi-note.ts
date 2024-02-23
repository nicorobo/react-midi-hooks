import { useState, useCallback } from 'react'
import { MIDINote, MIDINoteFilter, NoteMessage } from '../types'
import { useSubscribe } from './use-subscribe'

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
