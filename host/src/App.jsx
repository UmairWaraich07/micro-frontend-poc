import { useState, lazy, Suspense } from "react";
import "./App.css";
const Button = lazy(() => import("host/Button"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Host application</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <Suspense fallback={<div>Loading remote application...</div>}>
        <Button />
      </Suspense>
    </>
  );
}

export default App;
