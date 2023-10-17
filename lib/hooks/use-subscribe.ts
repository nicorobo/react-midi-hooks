import { useEffect, useContext } from 'react'
import { EventName } from '../types'
import { MIDIContext } from '../midi-provider'

export const useSubscribe = (event: EventName, cb: (args: any) => void) => {
  const { emitter } = useContext(MIDIContext)
  useEffect(() => {
    const id = emitter.subscribe(event, cb)
    return () => {
      emitter.unsubscribe('note', id)
    }
  }, [emitter, cb])
}
