import "./App.css";

function App() {
  return (
    <div className="App">
      <PizzaHeader />
      <PizzaMenu />
      <PizzaFooter />
    </div>
  );
}

export default App;

function PizzaHeader() {
  return <h1>Fast React Pizza Co</h1>;
}
function PizzaMenu() {
  return (
    <div>
      <h2>Our menu</h2>
    </div>
  );
}
function PizzaFooter() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  return <h1>{new Date().toLocaleDateString()}. We' re currentyl open</h1>;
}
