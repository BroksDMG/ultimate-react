import React from "react";
import "../styles/challangesStyles/challange1.css";
export default function Challange1() {
  return (
    <div className="card">
      <Avatar avatarName="challangesImages/avatar.webp" />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <div className="skill-list">
          {" "}
          <SkillList name="HTML+CSS" bgc="blue" emoji="💪" />
          <SkillList name="JavaScript" bgc="yellow" emoji="💪" />
          <SkillList name="Web Design" bgc="lightgreen" emoji="💪" />
          <SkillList name="Git and GitHub" bgc="red" emoji="👍" />
          <SkillList name="React" bgc="lightBlue" emoji="💪" />
          <SkillList name="Svelte" bgc="red" emoji="👶" />
        </div>
      </div>
    </div>
  );
}

function Avatar({ avatarName }) {
  return <img className="avatar" src={avatarName} alt="avatarchallange" />;
}
function Intro() {
  return (
    <>
      <h1>Jonas Schmedtmann</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, i like play board games, to cokk (and eat), or to
        just enjoy the Portuguese sin at the beach.
      </p>
    </>
  );
}
function SkillList(props) {
  return (
    <div style={{ background: `${props.bgc}` }} className="skill">
      {props.name} {props.emoji}
    </div>
  );
}
