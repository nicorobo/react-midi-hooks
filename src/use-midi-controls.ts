import { useState, useEffect } from 'react';
import { MIDIFilter } from './types';
import { useMIDIControl } from './use-midi-control';

export const useMIDIControls = (
  controls: number[],
  filter: MIDIFilter = {}
) => {
  const [values, setValues] = useState<number[]>(controls.map(() => 0));
  const { control, value } = useMIDIControl(filter);

  // TODO: Get this all fixed up
  useEffect(() => {
    const targetIndex = controls.indexOf(control);
    if (targetIndex > -1)
      setValues(values.map((v, i) => (i === targetIndex ? value : v)));
  }, [control, value]);

  return values;
};
