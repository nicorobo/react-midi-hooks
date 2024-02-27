import { useCallback, useContext } from 'react'
import { MIDIContext } from '../midi-provider'
import { inputSelected } from '../reducer'
import { InputsReturnValue } from '../types'

/**
 * Hook to interact with MIDI input devices within a MIDIContext.
 *
 * This hook provides functionality to access the list of available MIDI input devices,
 * the currently selected MIDI input device, and a method to select a MIDI input device by its ID.
 * It leverages a MIDIContext to manage state and dispatch actions related to MIDI input selection.
 *
 * @returns {InputsReturnValue} An object containing:
 *  - input: The currently selected MIDI input device based on the `selectedInputId`, or `undefined` if no such device is selected.
 *  - inputs: An array of all detected MIDI input devices.
 *  - selectInput: A function to select a MIDI input device by its ID. This updates the context state to reflect the selected device.
 *  - selectedInputId: The ID of the currently selected MIDI input device, or `undefined` if no device is selected.
 *
 * @example
 * // Example of using this hook in a component to list MIDI inputs and allow selection.
 * const { input, inputs, selectInput, selectedInputId } = useMIDIInputs();
 *
 * // To select a MIDI input by ID, for example when a user clicks on an input device in the UI
 * selectInput('desired-input-device-id');
 */

export const useMIDIInputs = (): InputsReturnValue => {
  const { state, dispatch } = useContext(MIDIContext)
  const { inputs, selectedInputId } = state
  const selectInput = useCallback(
    (inputId: string) => {
      dispatch(inputSelected(inputId))
    },
    [dispatch]
  )
  return {
    input: inputs.find(({ id }) => id === selectedInputId),
    inputs,
    selectInput,
    selectedInputId,
  }
}
