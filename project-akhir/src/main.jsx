import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import { ApolloProvider } from "@apollo/client";
import client from "./component/Apollo/Apollo-client1";

// melakukan rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </ApolloProvider>
);
