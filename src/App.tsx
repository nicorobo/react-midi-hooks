import { useMIDIOutput, MIDIProvider } from '../lib/main';

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

function App() {
  return (
    <MIDIProvider>
      <h1>@react-midi/hooks Test App</h1>
      <MIDIBoard />
    </MIDIProvider>
  );
}

export default App;
