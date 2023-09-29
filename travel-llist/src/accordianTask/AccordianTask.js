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
  const [isOpen, setIsOpen] = useState(false);
  function toggleOpen(id) {
    faqs.filter((item, itemId) =>
      id !== itemId ? isOpen : setIsOpen((e) => e)
    );
  }

  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <AccordionItems
          title={item.title}
          text={item.text}
          number={index + 1}
          isOpen={isOpen}
        />
      ))}
    </div>
  );
}

function AccordionItems({ title, text, number, isOpen }) {
  return (
    <div className={`item ${isOpen ? "open" : ""}`}>
      <p className={`number`}>{number.toString().padStart(2, "0")}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
