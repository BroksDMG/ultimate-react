import { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);
  return (
    <div className="App">
      <div className="con">
        <button onClick={() => setStep(step - 1)}>-</button>
        Step: {step}
        <button onClick={() => setStep(step + 1)}>+</button>
      </div>
      <div className="con">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        Count: {count}
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      <span>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} days from today is `
          : `${count} days ago was `}

        {date.toDateString()}
      </span>
    </div>
  );
}

export default App;
