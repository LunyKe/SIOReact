import React from "react";
import App from "./App";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter basename="/SIOReact">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );