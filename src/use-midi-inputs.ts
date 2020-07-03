import { useCallback, useContext } from 'react';
import { MIDIContext } from './midi-provider';
import { inputSelected } from './reducer';

export const useMIDIInputs = () => {
  const { state, dispatch } = useContext(MIDIContext);
  const { inputs, selectedInputId } = state;
  const selectInput = useCallback(
    (inputId: string) => {
      dispatch(inputSelected(inputId));
    },
    [dispatch]
  );
  return {
    input: inputs.find(({ id }) => id === selectedInputId),
    inputs,
    selectInput,
    selectedInputId,
  };
};
