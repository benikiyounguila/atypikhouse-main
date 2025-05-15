import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

// Hydratation de l'App dans le DOM existant
ReactDOM.hydrate(
  <App data={window.__INITIAL_DATA__} />,
  document.getElementById("root")
);
