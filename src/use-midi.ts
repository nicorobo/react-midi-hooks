import { useState, useEffect } from 'react';
import { Input, Output } from './types';

type Connections = {
  inputs: Input[];
  outputs: Output[];
};

const defaultConnections: Connections = { inputs: [], outputs: [] };

export const useMIDI = () => {
  const [connections, setConnections] = useState<Connections>(
    defaultConnections
  );
  const navigatorExists = typeof navigator !== 'undefined';
  const hasMIDI = Boolean(
    navigatorExists && navigator && navigator.requestMIDIAccess
  );
  useEffect(() => {
    if (hasMIDI) {
      navigator.requestMIDIAccess().then((access: any) => {
        setConnections({
          inputs: enrichInputs(Array.from(access.inputs.values())),
          outputs: Array.from(access.outputs.values()),
        });
        access.onstatechange = () => {
          setConnections({
            inputs: enrichInputs(Array.from(access.inputs.values())),
            outputs: Array.from(access.outputs.values()),
          });
        };
      });
    }
  }, []);
  return {
    inputs: connections.inputs,
    outputs: connections.outputs,
    hasMIDI,
  };
};

// Listeners can be added/deleted from individual inputs.
// This allows an input to have multiple 'onmidimessage' functions instead of setting/resetting one
const enrichInputs = (inputs: any[]): Input[] =>
  // Remeber that this is only adding properties to the input object, not really returning a new object.
  // This is a side effect that may present bugs/complications down the line.
  inputs.map((input: any) => {
    input.clockListeners = input.clockListeners || {};
    input.noteOnListeners = input.noteOnListeners || {};
    input.noteOffListeners = input.noteOffListeners || {};
    input.controlListeners = input.controlListeners || {};
    input.messageListeners = input.messageListeners || {};
    // input.onmidimessage = handleMIDIMessage; // This adds a listener by default, opening the connection and listening to every input
    return input;
  });
