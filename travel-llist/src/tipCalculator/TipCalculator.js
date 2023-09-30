import React, { useState } from "react";
import "./Tip.css";
export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [procentageTip1, setProcentageTip1] = useState(0);
  const [procentageTip2, setProcentageTip2] = useState(0);

  const tip = bill * ((procentageTip1 + procentageTip2) / 2 / 100);

  function reset() {
    setBill("");
    setProcentageTip1(0);
    setProcentageTip2(0);
  }
  return (
    <div>
      <Bill setBill={setBill} bill={bill} />
      <Tip tip={procentageTip1} setTip={setProcentageTip1}>
        How did you like the service
      </Tip>
      <Tip tip={procentageTip2} setTip={setProcentageTip2}>
        how did your friend like the serive
      </Tip>
      {bill > 0 && (
        <>
          <br />
          <Output bill={bill} tip={tip} />
          <br />
          <button onClick={() => reset()}>Reset</button>
        </>
      )}
    </div>
  );
}
function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}
function Bill({ setBill, bill }) {
  return (
    <div>
      <p>How much was the bill?</p>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}
function Tip({ children, tip, setTip }) {
  return (
    <div>
      <p>{children}</p>
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        <option value="0">Dissatissfied(0%)</option>
        <option value="5">It was okey(5%)</option>
        <option value="10">It was good(10%)</option>
        <option value="20">Absolutely amazing(20%)</option>
      </select>
    </div>
  );
}
