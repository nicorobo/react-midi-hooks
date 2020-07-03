import { useCallback, useContext } from 'react';
import { MIDIContext } from './midi-provider';
import { inputSelected } from './reducer';

export const useMIDIInputs = () => {
  const { state, dispatch } = useContext(MIDIContext);
  const selectInput = useCallback(
    (inputId: string) => {
      dispatch(inputSelected(inputId));
    },
    [dispatch]
  );
  return {
    selectedInputId: state.selectedInputId,
    inputs: state.inputs,
    selectInput,
  };
};
