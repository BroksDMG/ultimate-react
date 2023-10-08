import React, { useState } from "react";
import SplitForm from "./components/SplitForm";
import Users from "./components/Users";
import UserForm from "./components/UserForm";
import "./styles/EatNSplit.css";
export default function EatNSplit() {
  const [friends, setFriends] = useState([
    { friendName: "Ted", imageURL: "./img/avatar.webp" },
    { friendName: "Glock", imageURL: "./img/avatar.webp" },
  ]);
  const [isSelected, setIsSelected] = useState(null);
  const [whoBill, setWhoBill] = useState([]);
  return (
    <div className="app">
      <div>
        <Users
          whoBill={whoBill}
          users={friends}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
        <UserForm friends={friends} setFriends={setFriends} />
      </div>
      <div>
        <SplitForm friends={friends} id={isSelected} setWhoBill={setWhoBill} />
      </div>
    </div>
  );
}
