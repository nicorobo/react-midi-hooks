import React, { useEffect, useReducer, useRef } from 'react';
import { MIDIEmitter } from './midi-emitter';
import { reducer, accessReceived, defaultState, ReducerState } from './reducer';

export const MIDIContext = React.createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
  emitter: MIDIEmitter;
}>({ state: defaultState, dispatch: () => null, emitter: new MIDIEmitter() });

type Props = {
  children?: React.ReactNode;
};

export const MIDIProvider = ({ children }: Props) => {
  const emitter = useRef(new MIDIEmitter());
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { inputs, selectedInputId } = state;

  useEffect(() => {
    if (Boolean(navigator?.requestMIDIAccess)) {
      navigator.requestMIDIAccess().then((access: WebMidi.MIDIAccess) => {
        console.log('[midi access received]');
        dispatch(accessReceived(access));
        access.onstatechange = () => {
          console.log('[midi access state change]');
          dispatch(accessReceived(access));
        };
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const selectedInput = inputs.find((i) => i.id === selectedInputId);
    if (selectedInput) {
      selectedInput.onmidimessage = emitter.current.onMIDIMessage.bind(
        emitter.current
      );
      return () => (selectedInput.onmidimessage = null);
    }
    return () => {};
  }, [inputs, selectedInputId]);

  return (
    <MIDIContext.Provider value={{ state, dispatch, emitter: emitter.current }}>
      {children}
    </MIDIContext.Provider>
  );
};
