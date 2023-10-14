import {
  useMIDIOutput,
  MIDIProvider,
  useMIDIControl,
  useMIDIMessage,
  useMIDIInputs,
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
  const { inputs, selectedInputId, selectInput } = useMIDIInputs();
  const allCC = useMIDIControl();
  const message = useMIDIMessage();
  return (
    <div>
      {inputs.map((input) => (
        <button
          key={input.id}
          style={selectedInputId == input.id ? { background: 'red' } : {}}
          onClick={() => selectInput(input.id)}
        >
          {input.name}
        </button>
      ))}
      <h2>Messages</h2>
      {message?.data.join(',') ?? 'No message'}
      <h2>CC</h2>
      {allCC && (
        <p>
          <b>Channel:</b> {allCC.channel} <b>Control:</b> {allCC.control}{' '}
          <b>Value:</b> {allCC.value}
        </p>
      )}
    </div>
  );
};

function App() {
  return (
    <MIDIProvider>
      <h1>@react-midi/hooks Test App</h1>
      <MIDIMonitor />
      <MIDIBoard />
    </MIDIProvider>
  );
}

export default App;
