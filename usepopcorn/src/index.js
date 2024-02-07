import React from "react";
import ReactDOM from "react-dom/client";
import App from "./UsePopcorn/App";
import "./UsePopcorn/index.css";
//////////////////////////////////////////////////////////////////////FirSt Challange
// import FirstChallangeApp from "./FirstChallange/FirstChallangeApp";
// import "./assets/style.css";
//////////////////////////////////////////////////////////////////////ReactBehindTheScen
// import ReactBehindTheScen from "./ReactBehindTheScen/ReactBehindTheScen";
// import "./assets/ReactBehindTheScen.css";
// import CurrencyConverterTask from "./CurrencyConverter/CurrencyConverterTask";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <FirstChallangeApp /> */}
    {/* <ReactBehindTheScen /> */}
    {/* <CurrencyConverterTask /> */}
  </React.StrictMode>
);
