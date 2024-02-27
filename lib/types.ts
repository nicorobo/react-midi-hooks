export type Connection = {
  id: string
  name: string
  manufacturer: string
}

export type Input = {
  onmidimessage: ((message: MIDIMessage) => void) | null
} & Connection

export type Output = {
  send: (message: number[], timestamp?: number) => void
} & Connection

export type InputsReturnValue = {
  input: Input | undefined
  inputs: Input[]
  selectInput: (inputId: string) => void
  selectedInputId: string | null
}

export type MIDINoteFilter = {
  note?: number // allow multiple?
  channel?: number
  // min/max velocity?
}

export type MIDIControlFilter = {
  cc?: number // allow multiple?
  channel?: number
  // min/max value?
}

export type MIDIMessage = {
  data: number[]
}

export type Message = {
  target: number // note or control
  value: number // velocity or control value
  channel: number
}

export type NoteMessage = Message & {
  on: boolean
}

export type MIDINote = {
  note: number
  velocity: number
  channel: number
  on: boolean
}

export type MIDIControl = {
  control: number
  value: number
  channel: number
}

export type EventName = 'all' | 'note' | 'clock' | 'control'
