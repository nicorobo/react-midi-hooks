import { useState, useEffect } from 'react';
import { Input, MIDIFilter } from './types';
import { useMIDIControl } from './use-midi-control';
import { useConnectInput } from './use-connect-input';

export const useMIDIControls = (
  input: Input,
  controls: number[],
  filter: MIDIFilter = {}
) => {
  useConnectInput(input);
  const [values, setValues] = useState<number[]>(controls.map(() => 0));
  const { control, value } = useMIDIControl(input, filter);

  useEffect(() => {
    if (!input) return;
    const targetIndex = controls.indexOf(control);
    if (targetIndex > -1)
      setValues(values.map((v, i) => (i === targetIndex ? value : v)));
  }, [control, value]);

  return values;
};
