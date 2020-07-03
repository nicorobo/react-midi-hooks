import { useState, useEffect, useContext } from 'react';
import { MIDIContext } from './midi-provider';
import { MIDIMessage } from './types';

export const useMIDIMessage = () => {
  const { emitter } = useContext(MIDIContext);
  const [message, setMessage] = useState<MIDIMessage | undefined>();
  const handleMessage = (message: MIDIMessage) => {
    setMessage(message);
  };

  useEffect(() => {
    const id = emitter.subscribe('all', handleMessage);
    return () => {
      emitter.unsubscribe('all', id);
    };
  }, [emitter, handleMessage]);

  return message;
};
