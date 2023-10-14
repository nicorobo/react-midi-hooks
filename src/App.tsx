import {
  useMIDIOutput,
  MIDIProvider,
  useMIDIControl,
  useMIDIMessage,
  useMIDIInputs,
  useMIDIOutputs,
  useMIDIControls,
  useMIDINote,
  useMIDINotes,
} from '../lib/main';

const MIDIBoard = () => {
  const { noteOn, noteOff } = useMIDIOutput();
  const playNote = (note: number) => {
    if (noteOn && noteOff) {
      const notes = [
        { note, channel: 1 },
        { note, channel: 2 },
        { note, channel: 3 },
      ];
      noteOn(notes);
      window.setTimeout(() => noteOff(notes), 100);
    }
  };
  return (
    <div>
      <button onMouseDown={() => playNote(60)}>1</button>
      <button onMouseDown={() => playNote(61)}>2</button>
      <button onMouseDown={() => playNote(62)}>3</button>
      <button onMouseDown={() => playNote(63)}>4</button>
    </div>
  );
};

const MIDIMonitor = () => {
  const message = useMIDIMessage();
  return (
    <div>
      <h3>All Messages</h3>
      {message?.data.join(',') ?? 'No message'}
    </div>
  );
};

const MIDIControlTest = () => {
  const allCC = useMIDIControl();
  const cc4 = useMIDIControl({ target: 4 });
  const [cc5, cc6, cc7] = useMIDIControls([5, 6, 7]);
  return (
    <div>
      <h3>
        <code>{'useMIDIControl()'}</code>
      </h3>
      {allCC && (
        <p>
          <b>Channel:</b> {allCC.channel} <b>Control:</b> {allCC.control}{' '}
          <b>Value:</b> {allCC.value}
        </p>
      )}
      <h3>
        <code>{'useMIDIControl({ target: 4 })'}</code>
      </h3>
      {cc4 && (
        <p>
          <b>Channel:</b> {cc4.channel} <b>Control:</b> {cc4.control}{' '}
          <b>Value:</b> {cc4.value}
        </p>
      )}
      <h3>
        <code>{'useMIDIControls([5, 6, 7])'}</code>
      </h3>
      <b>CC 5: </b>
      {cc5}
      <b>CC 6: </b>
      {cc6}
      <b>CC 7: </b>
      {cc7}
    </div>
  );
};

const MIDINoteTest = () => {
  const allNote = useMIDINote();
  const middleC = useMIDINote({ target: 60 });
  const notes = useMIDINotes();
  return (
    <div>
      <h3>
        <code>{'useMIDINote()'}</code>
      </h3>
      {allNote && (
        <p>
          <b>Channel:</b> {allNote.channel} <b>Control:</b> {allNote.note}{' '}
          <b>Velocity:</b> {allNote.velocity} <b>On:</b> {allNote.on}
        </p>
      )}
      <h3>
        <code>{'useMIDINote({ target: 60 })'}</code>
      </h3>
      {middleC && (
        <p>
          <b>Channel:</b> {middleC.channel} <b>Note:</b> {middleC.note}{' '}
          <b>Velocity:</b> {middleC.velocity} <b>On:</b> {middleC.on}
        </p>
      )}
      <h3>
        <code>{'useMIDINotes()'}</code>
      </h3>
      {notes.map((note, i) => (
        <p key={note.note + i}>
          <b>Note: </b>
          {note.note} <b>Velocity: </b>
          {note.velocity}
          <b>Channel: </b>
          {note.channel}
        </p>
      ))}
    </div>
  );
};
const MIDIInterfaceSelector = () => {
  const { inputs, selectedInputId, selectInput } = useMIDIInputs();
  const { outputs, selectedOutputId, selectOutput } = useMIDIOutputs();
  return (
    <div>
      <div>
        <h3>Select Input</h3>
        {inputs.map(({ id, name }) => (
          <button key={id} onClick={() => selectInput(id)}>
            {name + (selectedInputId === id ? ' (selected)' : '')}
          </button>
        ))}
      </div>
      <div>
        <h3>Select Output</h3>
        {outputs.map(({ id, name }) => (
          <button key={id} onClick={() => selectOutput(id)}>
            {name + (selectedOutputId === id ? ' (selected)' : '')}
          </button>
        ))}
      </div>
    </div>
  );
};

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
  );
}

export default App;
