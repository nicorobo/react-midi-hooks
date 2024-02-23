import { useState } from 'react'
import { MIDIMessage } from '../types'
import { useSubscribe } from './use-subscribe'

export const useMIDIMessage = () => {
  const [message, setMessage] = useState<MIDIMessage | undefined>()
  const handleMessage = (message: MIDIMessage) => {
    setMessage(message)
  }
  useSubscribe('all', handleMessage)

  return message
}
