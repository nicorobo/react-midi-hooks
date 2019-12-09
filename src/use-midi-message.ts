import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { Input, MIDIMessage } from './types';
import { useConnectInput } from './use-connect-input';

export const useMIDIMessage = (input: Input) => {
  useConnectInput(input);

  const [message, setMessage] = useState({});
  const handleMessage = (message: MIDIMessage) => {
    setMessage(message);
  };

  useEffect(() => {
    if (!input) return;
    const id = uniqid();
    input.messageListeners[id] = handleMessage;
    return () => delete input.messageListeners[id];
  }, [input]);

  return message;
};
