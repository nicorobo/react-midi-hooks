import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { Input, Message, MIDIFilter, MIDIControl } from './types';
import { useConnectInput } from './use-connect-input';

export const useMIDIControl = (
  input: Input,
  { target: controlFilter, channel: channelFilter }: MIDIFilter = {}
) => {
  useConnectInput(input);
  const [value, setValue] = useState<MIDIControl>({
    control: controlFilter,
    value: undefined,
    channel: channelFilter,
  });
  const handleControlMessage = (message: Message) => {
    const { target, value, channel } = message;
    if (
      (!controlFilter || controlFilter === target) &&
      (!channelFilter || channelFilter === channel)
    ) {
      setValue({ control: target, value, channel });
    }
  };

  useEffect(() => {
    if (!input) return;
    const id = uniqid();
    input.controlListeners[id] = handleControlMessage;
    return () => delete input.controlListeners[id];
  }, [input, controlFilter, channelFilter]);
  return value;
};
