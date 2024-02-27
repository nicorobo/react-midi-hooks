import { useState, useEffect } from 'react'
import { MIDIControlFilter } from '../types'
import { useMIDIControl } from './use-midi-control'

/**
 * Hook to manage state for an array of MIDI control numbers, filtered by specific criteria.
 *
 * This hook listens for MIDI control change messages that match a provided filter,
 * and maintains an array of values corresponding to a predefined set of control numbers (`controls`). Each control's
 * value in the array is updated when a matching control change message is received. This is useful for components
 * that need to keep track of and react to changes in multiple MIDI control values simultaneously.
 *
 * @param {number[]} controls - An array of MIDI control numbers to monitor.
 * @param {Exclude<MIDIControlFilter, 'cc'>} [filter={}] - An object specifying additional filters for MIDI control change messages.
 *        Excludes the 'cc' property as that is specified by the first argument.
 *
 * @returns {number[]} An array of control values corresponding to the `controls` array. Each element in the array
 * represents the latest value for the control number at the same index in the `controls` input array.
 *
 * @example
 * // To use this hook to monitor control changes for MIDI controls 7 and 10 on channel 1
 * const controlValues = useMIDIControls([7, 10], { channel: 1 });
 * // controlValues will be an array of two numbers, initially [0, 0], updated with the latest values for controls 7 and 10.
 */

export const useMIDIControls = (
  controls: number[],
  filter: Exclude<MIDIControlFilter, 'cc'> = {}
) => {
  const [values, setValues] = useState<number[]>(controls.map(() => 0))
  const cc = useMIDIControl(filter)

  // TODO: Get this all fixed up
  useEffect(() => {
    if (cc) {
      const targetIndex = controls.indexOf(cc.control)
      if (targetIndex > -1)
        setValues(values.map((v, i) => (i === targetIndex ? cc.value : v)))
    }
  }, [cc])

  return values
}
