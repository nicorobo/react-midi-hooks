import { MultipleNotesWithOptions } from '../lib/hooks/use-midi-output'
import {
  useMIDIOutput,
  MIDIProvider,
  useMIDIControl,
  useMIDIMessage,
  useMIDIControls,
  useMIDINote,
  useMIDINotes,
} from '../lib/main'
import './App.css'
import { MIDIInterfaceSelector } from './MIDIInterfaceSelector'

const MIDIBoard = () => {
  const { noteOn, noteOff } = useMIDIOutput()
  const playNotesFromNumArr = (notes: number[]) => {
    if (noteOn && noteOff) {
      noteOn(notes)
      window.setTimeout(() => noteOff(notes), 1000)
    }
  }
  const playNotesFromObjArr = (notes: MultipleNotesWithOptions) => {
    if (noteOn && noteOff) {
      noteOn(notes)
      window.setTimeout(() => noteOff(notes), 1000)
    }
  }
  return (
    <div className="section">
      <h2 className="section-title">Output</h2>
      <div className="subsection">
        <div className="subsection-title">noteOn()</div>
        <div className="subsection-description">
          Triggers note on with various settings
        </div>
        <button onMouseDown={() => noteOn && noteOn(60)}>{'noteOn(60)'}</button>
        <button onMouseDown={() => noteOn && noteOn(60, { velocity: 50 })}>
          {'noteOn(60, {velocity: 50})'}
        </button>
        <button onMouseDown={() => noteOn && noteOn(60, { channel: 2 })}>
          {'noteOn(60, {channel: 2})'}
        </button>
        <button
          onMouseDown={() => noteOn && noteOn(60, { velocity: 50, channel: 2 })}
        >
          {'noteOn(60, {velocity: 50, channel: 2})'}
        </button>
      </div>

      <div className="subsection">
        <div className="subsection-title">noteOff()</div>
        <div className="subsection-description">
          Triggers note off with various settings
        </div>
        <button onMouseDown={() => noteOff && noteOff(60)}>noteOff(60)</button>
        <button onMouseDown={() => noteOff && noteOff(60, { velocity: 50 })}>
          {'noteOff(60, {velocity: 50})'}
        </button>
        <button onMouseDown={() => noteOff && noteOff(60, { channel: 2 })}>
          {'noteOff(60, {channel: 2})'}
        </button>
        <button
          onMouseDown={() =>
            noteOff && noteOff(60, { velocity: 50, channel: 2 })
          }
        >
          {'noteOff(60, {velocity: 50, channel: 2})'}
        </button>
      </div>

      <div className="subsection">
        <div className="subsection-title">noteOn() + noteOff()</div>
        <div className="subsection-description">
          Triggers note on and schedules note off with setTimeout()
        </div>
        <button onMouseDown={() => playNotesFromNumArr([60, 63, 67])}>
          noteOn([60, 63, 67])
        </button>
        <button
          onMouseDown={() =>
            playNotesFromObjArr([
              { note: 60, velocity: 45 },
              { note: 67, velocity: 90 },
            ])
          }
        >
          {'noteOn([{note: 60, velocity: 45}, {note: 67, velocity: 90}])'}
        </button>
      </div>
    </div>
  )
}

const MIDIMonitor = () => {
  const message = useMIDIMessage()
  return (
    <div className="section">
      <div className="section-title">All Input</div>
      <div className="subsection">
        <div className="subsection-title">useMIDIMessage()</div>
        <div className="subsection-description">
          Listens to all midi messages coming from input.
        </div>
        {message?.data.join(',') ?? 'No message'}
      </div>
    </div>
  )
}

const MIDIControlTest = () => {
  const allCC = useMIDIControl()
  const cc4 = useMIDIControl({ cc: 4 })
  const [cc5, cc6, cc7] = useMIDIControls([5, 6, 7])
  return (
    <div className="section">
      <div className="section-title">MIDI CCs</div>
      <div className="subsection">
        <div className="subsection-title">useMIDIControl()</div>
        <div className="subsection-description">
          Listens to all midi control messages coming from input.
        </div>

        <div>
          Channel: <span className="value">{allCC?.channel}</span> Control:{' '}
          <span className="value">{allCC?.control}</span> Value:{' '}
          <span className="value">{allCC?.value}</span>
        </div>
      </div>
      <div className="subsection">
        <div className="subsection-title">
          {'useMIDIControl({ target: 4 })'}
        </div>
        <div className="subsection-description">
          Listens to CC 4 messages coming from input.
        </div>

        <div>
          Channel: <span className="value">{cc4?.channel}</span> Control:{' '}
          <span className="value">{cc4?.control}</span> Value:{' '}
          <span className="value">{cc4?.value}</span>
        </div>
      </div>

      <div className="subsection">
        <div className="subsection-title">{'useMIDIControls([5, 6, 7])'}</div>
        <div className="subsection-description">
          Listens to CC4 messages coming from input.
        </div>
        CC5: <span className="value">{cc5}</span> CC6:{' '}
        <span className="value">{cc6}</span> CC7:{' '}
        <span className="value">{cc7}</span>
      </div>
    </div>
  )
}

const MIDINoteTest = () => {
  const allNote = useMIDINote()
  const middleC = useMIDINote({ note: 60 })
  const notes = useMIDINotes()
  return (
    <div className="section">
      <div className="section-title">Notes</div>
      <div className="subsection">
        <div className="subsection-title">useMIDINote()</div>
        <div className="subsection-description">
          Listens to all incoming MIDI notes on input.
        </div>
        <p>
          Channel: <span className="value">{allNote?.channel}</span> Control:{' '}
          <span className="value">{allNote?.note}</span> Velocity:{' '}
          <span className="value">{allNote?.velocity}</span> On:{' '}
          <span className="value">{allNote?.on ? 'true' : 'false'}</span>
        </p>
      </div>
      <div className="subsection">
        <div className="subsection-title">{'useMIDINote({ target: 60 })'}</div>
        <div className="subsection-description">
          Listens to middle C coming from input.
        </div>
        <p>
          Channel: <span className="value">{middleC?.channel}</span> Note:{' '}
          <span className="value">{middleC?.note}</span> Velocity:{' '}
          <span className="value">{middleC?.velocity}</span> On:{' '}
          <span className="value">{middleC?.on ? 'true' : 'false'}</span>
        </p>
      </div>

      <div className="subsection tall">
        <div className="subsection-title">{'useMIDINotes()'}</div>
        <div className="subsection-description">
          Listens to input and maintains a list of active notes.
        </div>
        {notes.map((note, i) => (
          <p key={note.note + i}>
            Note: <span className="value">{note.note}</span> Velocity:{' '}
            <span className="value">{note.velocity}</span> Channel:{' '}
            <span className="value">{note.channel}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <MIDIProvider>
      <h1>@react-midi/hooks Test App</h1>
      <MIDIInterfaceSelector />
      <MIDIMonitor />
      <MIDIControlTest />
      <MIDINoteTest />
      <MIDIBoard />
    </MIDIProvider>
  )
}

export default App
