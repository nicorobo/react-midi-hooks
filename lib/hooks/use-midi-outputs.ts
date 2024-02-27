import { useCallback, useContext } from 'react'
import { MIDIContext } from '../midi-provider'
import { outputSelected } from '../reducer'

/**
 * Hook to access and manage MIDI output devices within a MIDIContext.
 *
 * This hook provides an interface to interact with available MIDI outputs and select a specific output device.
 * It leverages the MIDIContext to maintain and update the state related to MIDI outputs, including the current selection.
 *
 * @returns {Object} An object containing:
 *  - output: The currently selected MIDI output device, or `undefined` if no device is selected.
 *  - outputs: An array of all available MIDI output devices.
 *  - selectOutput: A function to select an output device by its ID.
 *  - selectedOutputId: The ID of the currently selected output device.
 *
 * @example
 * // Example of using this hook in a component to list MIDI outputs and allow selection.
 * const { output, outputs, selectOutput, selectedOutputId } = useMIDIOutputs();
 *
 * // To select a MIDI output by ID, for example when a user clicks on an output device in the UI
 * selectOutput('desired-output-device-id');
 */

export const useMIDIOutputs = () => {
  const { state, dispatch } = useContext(MIDIContext)
  const { outputs, selectedOutputId } = state
  const selectOutput = useCallback(
    (outputId: string) => {
      dispatch(outputSelected(outputId))
    },
    [dispatch]
  )
  return {
    output: outputs.find(({ id }) => id === selectedOutputId),
    outputs,
    selectOutput,
    selectedOutputId,
  }
}
