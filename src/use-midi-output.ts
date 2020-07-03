import { MIDIConstants } from './constants';
import { useMIDIOutputs } from './use-midi-outputs';

export const useMIDIOutput = () => {
  const { output } = useMIDIOutputs();
  if (!output) return {};
  const noteOn = (note: number, velocity = 127, channel = 1) => {
    const noteOnAndChannel = MIDIConstants.noteOn | getChannel(channel);
    output.send([noteOnAndChannel, note, velocity]);
  };
  const noteOff = (note: number, velocity = 127, channel = 1) => {
    const noteOffAndChannel = MIDIConstants.noteOff | getChannel(channel);
    output.send([noteOffAndChannel, note, velocity]);
  };
  const cc = (value: number, control = 0x14, channel = 1) => {
    const ccAndChannel = MIDIConstants.cc | getChannel(channel);
    output.send([ccAndChannel, control, value]);
  };
  return { noteOn, noteOff, cc };
};

const getChannel = (channel: number) => {
  if (channel < 1 || channel > 16) return 0; //Channel 1
  return channel - 1;
};
