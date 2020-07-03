import React, {
  useEffect,
  useReducer,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';
import { MIDIFilter, MIDINote } from './types';
import { reducer, accessReceived, defaultState, ReducerState } from './reducer';
import { MIDIEmitter } from './emitter';

export const MIDIContext = React.createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
  emitter: MIDIEmitter;
}>({ state: defaultState, dispatch: () => null, emitter: new MIDIEmitter() });

export const MIDIProvider: React.FC<{}> = ({ children }) => {
  const emitter = useRef(new MIDIEmitter());
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { selectedInputId, inputs } = state;

  useEffect(() => {
    if (Boolean(navigator?.requestMIDIAccess)) {
      navigator.requestMIDIAccess().then((access: WebMidi.MIDIAccess) => {
        dispatch(accessReceived(access));
        access.onstatechange = () => {
          dispatch(accessReceived(access));
        };
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const selectedInput = inputs.find((i) => i.id === selectedInputId);
    if (!selectedInput) {
      return;
    }
    selectedInput.onmidimessage = emitter.current.onMIDIMessage.bind(
      emitter.current
    );
    return () => (selectedInput.onmidimessage = null);
  }, [inputs, selectedInputId]);

  return (
    <MIDIContext.Provider value={{ state, dispatch, emitter: emitter.current }}>
      {children}
    </MIDIContext.Provider>
  );
};
