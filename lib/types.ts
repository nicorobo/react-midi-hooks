export type Connection = {
  id: string;
  name: string;
  manufacturer: string;
};

export type Input = {
  onmidimessage: ((message: MIDIMessage) => void) | null;
} & Connection;

export type Output = {
  send: (message: number[], timestamp?: number) => void;
} & Connection;

export type MIDIFilter = {
  target?: number;
  channel?: number;
};

export type MIDIMessage = {
  data: number[];
};

export type Message = {
  target: number; // note or control
  value: number; // velocity or control value
  channel: number;
};

export type MIDINote = {
  note: number;
  velocity: number;
  channel: number;
  on: boolean;
};

export type MIDIControl = {
  control: number;
  value: number | undefined;
  channel: number;
};
