import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { disableReactDevTools } from "./disableReactDevTools";

const root = ReactDOM.createRoot(document.getElementById("root"));
if (process.env.NODE_ENV === "production") disableReactDevTools();
root.render(
  // <React.StrictMode>
        <App />
  // </React.StrictMode>
);

