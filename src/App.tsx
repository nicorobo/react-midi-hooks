import { useMIDIOutput, MIDIProvider } from '../lib/main';

const MIDIBoard = () => {
  const { noteOn, noteOff } = useMIDIOutput();
  const playNote = (note: number) => {
    if (noteOn && noteOff) {
      noteOn(note);
      window.setTimeout(() => noteOff(note), 100);
    }
  };
  return (
    <div>
      <button onClick={() => playNote(60)}>C</button>
      <button onClick={() => playNote(64)}>E</button>
      <button onClick={() => playNote(67)}>G</button>
      <button onClick={() => playNote(71)}>B</button>
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
