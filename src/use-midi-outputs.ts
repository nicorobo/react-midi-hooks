import { useCallback, useContext } from 'react';
import { MIDIContext } from './midi-provider';
import { outputSelected } from './reducer';

export const useMIDIOutputs = () => {
  const { state, dispatch } = useContext(MIDIContext);
  const selectOutput = useCallback(
    (outputId: string) => {
      dispatch(outputSelected(outputId));
    },
    [dispatch]
  );
  return {
    selectedOutputId: state.selectedOutputId,
    outputs: state.outputs,
    selectOutput,
  };
};
