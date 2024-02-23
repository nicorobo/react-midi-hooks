import { Input, Output } from './types'

export type ReducerState = {
  inputs: Input[]
  outputs: Output[]
  selectedInputId: string | null
  selectedOutputId: string | null
}

enum ActionTypes {
  accessReceived = 'AccessReceived',
  inputSelected = 'InputSelected',
  outputSelected = 'OutputSelected',
}

export const defaultState: ReducerState = {
  inputs: [],
  outputs: [],
  selectedInputId: null,
  selectedOutputId: null,
}

export const reducer = (
  state: ReducerState = defaultState,
  action: { type: string; payload?: any }
): ReducerState => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.accessReceived:
      // If selectedInputId is defined and the id still exists in the new connections, let it remain
      const inputExists = payload.inputs.some(
        (input: Input) => input.id === state.selectedInputId
      )
      const outputExists = payload.outputs.find(
        (output: Input) => output.id === state.selectedOutputId
      )
      return {
        ...state,
        inputs: payload.inputs,
        outputs: payload.outputs,
        selectedInputId: inputExists
          ? state.selectedInputId
          : payload.inputs.length
          ? payload.inputs[0].id
          : null,
        selectedOutputId: outputExists
          ? state.selectedOutputId
          : payload.outputs.length
          ? payload.outputs[0].id
          : null,
      }
    case ActionTypes.inputSelected:
      return {
        ...state,
        selectedInputId: payload.inputId,
      }
    case ActionTypes.outputSelected:
      return {
        ...state,
        selectedOutputId: payload.outputId,
      }
    default:
      return state
  }
}

export const accessReceived = (access: WebMidi.MIDIAccess) => ({
  type: ActionTypes.accessReceived,
  payload: {
    inputs: Array.from(access.inputs.values()),
    outputs: Array.from(access.outputs.values()),
  },
})

export const inputSelected = (inputId: string) => ({
  type: ActionTypes.inputSelected,
  payload: { inputId },
})

export const outputSelected = (outputId: string) => ({
  type: ActionTypes.outputSelected,
  payload: { outputId },
})
