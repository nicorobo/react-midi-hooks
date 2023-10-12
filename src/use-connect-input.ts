import { useEffect } from 'react';
import { Input, MIDIMessage } from './types';

// By using useConnectInput at the beggining of an input hook, we prevent opening/maintaining connections with unused inputs.
// This may have reprecusions when more than one hook is used for the same input, and one of them unregisters.
export const useConnectInput = (input: Input) => {
  useEffect(() => {
    if (!input) return;
    if (!input.onmidimessage) input.onmidimessage = handleMIDIMessage;
    return () => (input.onmidimessage = null);
  }, [input]);
};

// If listeners were kept in a general .listeners field then 100 functions listening for a noteOn event would get
// called for every clock tick. I imagine this would affect performance. There must be a better way than this as well
function handleMIDIMessage(message: MIDIMessage) {
  const action = message.data[0] & 0xf0; // Mask channel/least significant bits;
  const leastSig = message.data[0] & 0x0f; // Mask action bits;
  const channel = leastSig + 1;
  for (const key in this.messageListeners) {
    this.messageListeners[key](message); // (value, control, channel)
  }
  switch (action) {
    case 0xb0: // Control Change Message
      for (const key in this.controlListeners) {
        this.controlListeners[key]({
          target: message.data[2],
          value: message.data[1],
          channel,
        }); // (value, control, channel)
      }
      break;
    case 0x90: // Note On Message
      for (const key in this.noteOnListeners) {
        this.noteOnListeners[key]({
          target: message.data[1],
          value: message.data[2],
          channel,
        }); // (note, velocity, channel)
      }
      break;
    case 0x80: // Note Off Message
      for (const key in this.noteOffListeners) {
        this.noteOffListeners[key]({
          target: message.data[1],
          value: message.data[2],
          channel,
        }); // (note, velocity, channel)
      }
      break;
    case 0xf0: // Transport/Clock Message
      for (const key in this.clockListeners) {
        this.clockListeners[key](leastSig); // (type)
      }
      break;
    default:
      break;
  }
}
