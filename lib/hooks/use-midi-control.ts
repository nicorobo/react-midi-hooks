import { useState, useCallback } from 'react';
import { Message, MIDIControlFilter, MIDIControl } from '../types';
import { useSubscribe } from './use-subscribe';

// Before a control message is sent, we do not have a default value for the control.
type MIDIControlState = MIDIControl & { value?: number };

export const useMIDIControl = ({
  cc: controlFilter,
  channel: channelFilter,
}: MIDIControlFilter = {}) => {
  const [value, setValue] = useState<MIDIControlState | undefined>(undefined);
  const handleCC = useCallback(
    (message: Message) => {
      const { target, value, channel } = message;
      if (
        (!controlFilter || controlFilter === target) &&
        (!channelFilter || channelFilter === channel)
      ) {
        setValue({ control: target, value, channel });
      }
    },
    [controlFilter, channelFilter, setValue]
  );
  useSubscribe('control', handleCC);
  return value;
};
