import { useState } from 'react'
import { MIDIMessage } from '../types'
import { useSubscribe } from './use-subscribe'

/**
 * Custom hook to subscribe to all MIDI messages.
 *
 * This hook listens for any MIDI messages and updates its state with the latest message received.
 * It is useful for components that need to react to or display information based on incoming MIDI messages.
 *
 * @returns {MIDIMessage | undefined} - The latest MIDI message received or `undefined` if no message has been received yet.
 *
 * @example
 * // To use this hook in a component to display the latest MIDI message
 * const midiMessage = useMIDIMessage();
 * if (midiMessage) {
 *   console.log(`MIDI message received:`, midiMessage);
 * }
 */

export const useMIDIMessage = () => {
  const [message, setMessage] = useState<MIDIMessage | undefined>()
  const handleMessage = (message: MIDIMessage) => {
    setMessage(message)
  }
  useSubscribe('all', handleMessage)

  return message
}
