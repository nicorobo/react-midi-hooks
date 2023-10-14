import { useState, useEffect, useCallback, useContext } from 'react';
import { Message, MIDIFilter, MIDIControl } from '../types';
import { MIDIContext } from '../midi-provider';

// Before a control message is sent, we do not have a default value for the control.
type MIDIControlState = MIDIControl & { value?: number };

export const useMIDIControl = ({
  target: controlFilter,
  channel: channelFilter,
}: MIDIFilter = {}) => {
  const { emitter } = useContext(MIDIContext);
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

  useEffect(() => {
    const id = emitter.subscribe('control', handleCC);
    return () => {
      emitter.unsubscribe('control', id);
    };
  }, [emitter, handleCC]);
  return value;
};
