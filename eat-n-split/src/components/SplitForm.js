import React, { useState } from "react";
import "../styles/SplitForm.css";

export default function SplitForm({ friends, id, setWhoBill }) {
  const friendData = friends.filter((_, index) => index === id);
  const [bill, setBill] = useState("");
  const [who, setWho] = useState(1);
  const [yourBill, setYourBill] = useState("");
  function yourBillHandler(inputBill) {
    setYourBill(inputBill);
  }
  function onSplitHandler() {
    who === 1
      ? setWhoBill((whoBill) => [
          ...whoBill,
          { who: "You", bill: yourBill, whoId: id },
        ])
      : setWhoBill((whoBill) => [
          ...whoBill,
          {
            who: friendData[0]?.friendName,
            bill: bill - yourBill,
            whoId: id,
          },
        ]);
    setBill("");
    setYourBill("");
  }
  return (
    <>
      {id || id === 0 ? (
        <div className="container">
          <p>{`Split a bill with ${friendData[0]?.friendName}`}</p>
          <ul>
            <li>
              <label>💰 Bill Value</label>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </li>
            <li>
              <label>🧍‍♂️ Your expense</label>
              <input
                type="text"
                value={yourBill}
                onChange={(e) => yourBillHandler(Number(e.target.value))}
              />
            </li>
            <li>
              <label>👩🏼‍🤝‍👩🏼 {friendData[0]?.friendName} expenese</label>
              <input
                type="number"
                value={bill > 0 || yourBill > 0 ? bill - yourBill : ""}
                readOnly
              />
            </li>
            <li>
              <label>🤑 Who is playing the bill?</label>
              <select
                value={who}
                onChange={(e) => setWho(Number(e.target.value))}
                className="option"
              >
                <option value={1}>You</option>
                {friendData.map((friend, i) => (
                  <option value={2}>{friend.friendName}</option>
                ))}
              </select>
            </li>
            <li>
              <label></label>
              <button className="splitButton" onClick={() => onSplitHandler()}>
                Split Bill
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
