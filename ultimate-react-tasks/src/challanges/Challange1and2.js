import React from "react";
import "../styles/challangesStyles/challange1and2.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];
export default function Challange1and2() {
  return (
    <div className="card">
      <Avatar avatarName="challangesImages/avatar.webp" />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <div className="skill-list">
          {skills.map((skill) => (
            <SkillList
              key={skill.skill}
              name={skill.skill}
              bgc={skill.color}
              emoji={
                skill.level === "beginner"
                  ? "👶"
                  : skill.level === "advanced"
                  ? "💪"
                  : "👍"
              }
            />
          ))}
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
