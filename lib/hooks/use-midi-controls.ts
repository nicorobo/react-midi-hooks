import { useState, useEffect } from 'react';
import { MIDIFilter } from '../types';
import { useMIDIControl } from './use-midi-control';

export const useMIDIControls = (
  controls: number[],
  filter: MIDIFilter = {}
) => {
  const [values, setValues] = useState<number[]>(controls.map(() => 0));
  const cc = useMIDIControl(filter);

  // TODO: Get this all fixed up
  useEffect(() => {
    if (cc) {
      const targetIndex = controls.indexOf(cc.control);
      if (targetIndex > -1)
        setValues(values.map((v, i) => (i === targetIndex ? cc.value : v)));
    }
  }, [cc]);

  return values;
};
