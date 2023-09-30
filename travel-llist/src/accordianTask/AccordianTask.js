import "./styles.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <AccordionItems
          title={item.title}
          number={index + 1}
          curOpen={curOpen}
          setCurOpen={setCurOpen}
        >
          {item.text}
        </AccordionItems>
      ))}
      <AccordionItems
        title={"Do you ship to countries outside the EU?"}
        number={23}
        curOpen={curOpen}
        setCurOpen={setCurOpen}
      >
        Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt
        commodi beatae, explicabo natus.
      </AccordionItems>
    </div>
  );
}

function AccordionItems({ title, number, curOpen, setCurOpen, children }) {
  const isOpen = number === curOpen;
  function onClikHandler() {
    number === curOpen ? setCurOpen(null) : setCurOpen(number);
  }
  return (
    <div
      onClick={() => onClikHandler()}
      className={`item ${isOpen ? "open" : ""}`}
    >
      <p className={`number`}>{number.toString().padStart(2, "0")}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
