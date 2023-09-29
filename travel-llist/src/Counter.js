import { useState } from "react";
import "./App.css";

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);
  function reset() {
    setCount(0);
    setStep(1);
  }
  return (
    <div className="App">
      <div className="con">
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>
      <div className="con">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type="Number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
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
      <div className="con">
        <button onClick={() => reset()}>RESET</button>
      </div>
    </div>
  );
}

export default Counter;
