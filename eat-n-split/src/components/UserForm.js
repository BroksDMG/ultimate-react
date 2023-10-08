import React, { useState } from "react";
import "../styles/UserForm.css";
export default function UserForm({ friends, setFriends }) {
  const [friendName, setFriendName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  function closeUserForm() {
    setFriends(() => [
      ...friends,
      {
        friendName: friendName,
        imageURL: imageURL,
      },
    ]);
    setIsOpen((e) => !e);
    setFriendName("");
    setImageURL("");
  }
  return (
    <>
      {!isOpen ? (
        <div className="buttonBox">
          <button onClick={() => setIsOpen((e) => !e)}>Add friend</button>
        </div>
      ) : (
        <div className="userFormContainer">
          <section>
            <label>👩🏼‍🤝‍👩🏼 Friend name</label>{" "}
            <input
              type="text"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
            />
          </section>
          <section>
            <label>📷 Image URL</label>{" "}
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </section>
          <section>
            <label></label>
            <button onClick={() => closeUserForm()}>Add</button>
          </section>
        </div>
      )}
    </>
  );
}
