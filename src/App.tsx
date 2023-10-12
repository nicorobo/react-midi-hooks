import { useContext } from 'react';
import { MIDIContext, MIDIProvider } from '../lib/main';

const MIDIMonitor = () => {
  const reducerState = useContext(MIDIContext);
  console.log(reducerState.state);
  return <p>MIDI Monitor</p>;
};
function App() {
  return (
    <MIDIProvider>
      <h1>@react-midi/hooks Test App</h1>
      <MIDIMonitor />
    </MIDIProvider>
  );
}

export default App;
