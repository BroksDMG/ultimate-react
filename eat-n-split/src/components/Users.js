import React, { useState } from "react";
import "../styles/Users.css";
import User from "./User";
export default function Users({ users, isSelected, setIsSelected, whoBill }) {
  return (
    <div className="userContainer">
      {users.map((user, i) => (
        <User
          whoBill={whoBill}
          img={user.imageURL}
          friend={user.friendName}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          id={i}
        />
      ))}
    </div>
  );
}
