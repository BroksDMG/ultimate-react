import "../styles/projectsStyles/pizzaStyles.css";
import pizzadData from "../data/pizzaData.js";
function PizzaMenu() {
  return (
    <div className="App">
      <PizzaHeader />
      <Menu />
      <PizzaFooter />
    </div>
  );
}
export default PizzaMenu;

function PizzaHeader() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co</h1>
    </header>
  );
}
function Menu() {
  const pizzas = pizzadData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We're still worikng on our menu. Please come back leter</p>
      )}
    </main>
  );
}
function PizzaFooter() {
  const hours = {
    currentHour: new Date().getHours(),
    openHour: 12,
    closeHour: 22,
    get isOpen() {
      return (
        this.currentHour >= this.openHour && this.currentHour <= this.closeHour
      );
    },
  };
  return (
    <footer className="footer">
      {hours.isOpen ? (
        <Order hours={hours} />
      ) : (
        <p>
          We're happy to welcome you between {hours.openHour}:00 and{" "}
          {hours.closeHour}:00.{" "}
        </p>
      )}
    </footer>
  );
}
function Order({ hours }) {
  return (
    <div className="order">
      <p>We're open until {hours.closeHour}:00. Come visit ur or order onlin</p>
      <button className="btn">order</button>
    </div>
  );
}
function Pizza({ pizzaObj }) {
  if (pizzaObj.soldOut) return null;
  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />{" "}
      <h3>{pizzaObj.name}</h3> <p>{pizzaObj.ingredients}</p>
      <span>{pizzaObj.price + 3}</span>
    </li>
  );
}
