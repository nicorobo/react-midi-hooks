import { useCallback, useContext } from 'react';
import { MIDIContext } from '../midi-provider';
import { outputSelected } from '../reducer';

export const useMIDIOutputs = () => {
  const { state, dispatch } = useContext(MIDIContext);
  const { outputs, selectedOutputId } = state;
  const selectOutput = useCallback(
    (outputId: string) => {
      dispatch(outputSelected(outputId));
    },
    [dispatch]
  );
  return {
    output: outputs.find(({ id }) => id === selectedOutputId),
    outputs,
    selectOutput,
    selectedOutputId,
  };
};
