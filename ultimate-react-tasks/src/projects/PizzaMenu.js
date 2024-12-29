import "../styles/projectsStyles/pizzaStyles.css";

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
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
    </main>
  );
}
function PizzaFooter() {
  return (
    <footer className="footer">
      {new Date().toLocaleDateString()}. We' re currentyl open
    </footer>
  );
}
function Pizza(props) {
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} /> <h3>{props.name}</h3>{" "}
      <p>{props.ingredients}</p>
      <span>{props.price + 3}</span>
    </div>
  );
}
