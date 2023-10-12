import { useState } from 'react';
import { useFortune } from '../lib/main';

function App() {
  const [count, setCount] = useState(0);
  const fortune = useFortune({ fortune: 'You will have much luck' });
  console.log({ fortune });
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
