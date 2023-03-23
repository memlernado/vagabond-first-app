import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/global";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </>
  // </React.StrictMode>
);
