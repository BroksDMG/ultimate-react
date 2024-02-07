import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

function CurrencyConverterTask() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState(0);
  useEffect(() => {
    if (fromCurrency === toCurrency) return;
    fetch(
      `https://api.frankfurter.app/latest?amount=${currentAmount}&from=${fromCurrency}&to=${toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => setOutput(data));
  }, [currentAmount, fromCurrency, toCurrency]);
  console.log();
  return (
    <div>
      <input
        type="text"
        value={currentAmount}
        onChange={(e) => setCurrentAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <span>{currentAmount && Object.values(output.rates)[0]}</span>
    </div>
  );
}

export default CurrencyConverterTask;
