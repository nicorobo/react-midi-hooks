import React, { useEffect, useReducer } from 'react';
import { reducer, accessReceived, defaultState, ReducerState } from './reducer';

export const MIDIContext = React.createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
}>({ state: defaultState, dispatch: () => null });

type Props = {
  children?: React.ReactNode;
};

export const MIDIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

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

  return (
    <MIDIContext.Provider value={{ state, dispatch }}>
      {children}
    </MIDIContext.Provider>
  );
};
