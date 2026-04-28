import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ScreenShareAppStore } from "./store/ScreenShareAppStore";
import { ScreenShareApp } from "./ScreenShareApp";
import "./styles/GlobalStyles.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ScreenShareAppStore}>
      <ScreenShareApp />
    </Provider>
  </React.StrictMode>,
);
