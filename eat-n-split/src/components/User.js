import React, { useState } from "react";
import "../styles/Users.css";
export default function User({
  img,
  friend,
  isSelected,
  setIsSelected,
  id,
  whoBill,
}) {
  const selected = isSelected === id ? true : false;

  function onButtonHandler() {
    setIsSelected(id);
    selected === true ? setIsSelected(null) : setIsSelected(id);
  }
  let color = "";
  let text = `You and ${friend} are even`;
  whoBill?.forEach((element) => {
    if (element.whoId === id) {
      const { who, bill } = element;
      if (who === "You") {
        text = `${friend} owes you ${bill}$`;
        color = "green";
      } else {
        text = `You owe ${friend} ${bill}$`;
        color = "red";
      }
    }
  });

  return (
    <>
      <div
        className="box"
        style={{ background: selected ? "bisque" : "white" }}
      >
        <div className="item1">
          <img src={img} alt="avatar" />
        </div>
        <div className="textBox item2">
          <p>{friend}</p>
          <span style={{ color: color }}>{text}</span>
        </div>
        <div className="item3">
          <button onClick={() => onButtonHandler()}>
            {selected ? "Close" : "Select"}
          </button>
        </div>
      </div>
    </>
  );
}
