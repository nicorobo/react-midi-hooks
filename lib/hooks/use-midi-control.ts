import { useState, useCallback } from 'react'
import { Message, MIDIControlFilter, MIDIControl } from '../types'
import { useSubscribe } from './use-subscribe'

// Before a control message is sent, we do not have a default value for the control.
type MIDIControlState = MIDIControl & { value?: number }

/**
 * Hook to subscribe to MIDI control change messages based on specified filters.
 *
 * This hook listens for MIDI control change (CC) messages and updates its state
 * with the details of the message if it matches the specified control number and channel filters.
 * If no filters are provided, it will update the state with every control change message received.
 * This can be useful for components that need to react to specific control change messages.
 *
 * @param {Object} [filters={}] - The filters to apply to incoming MIDI control change messages.
 * @param {number} [filters.cc] - The MIDI control change number to filter messages by.
 * @param {number} [filters.channel] - The MIDI channel number to filter messages by.
 *
 * @returns {MIDIControlState | undefined} - The latest MIDI control change message that matches the filters,
 *                                           or `undefined` if no message has matched the filters yet.
 *
 * @example
 * // To use this hook to listen for control change number 7 on channel 1
 * const midiControl = useMIDIControl({ cc: 7, channel: 1 });
 * if (midiControl) {
 *   console.log(`Control change ${midiControl.control} with value ${midiControl.value} received on channel ${midiControl.channel}`);
 * }
 */

export const useMIDIControl = ({
  cc: controlFilter,
  channel: channelFilter,
}: MIDIControlFilter = {}) => {
  const [value, setValue] = useState<MIDIControlState | undefined>(undefined)
  const handleCC = useCallback(
    (message: Message) => {
      const { target, value, channel } = message
      if (
        (!controlFilter || controlFilter === target) &&
        (!channelFilter || channelFilter === channel)
      ) {
        setValue({ control: target, value, channel })
      }
    },
    [controlFilter, channelFilter, setValue]
  )
  useSubscribe('control', handleCC)
  return value
}
