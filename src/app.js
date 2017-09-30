import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";
import { StaticRouter } from "react-router";

import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Topics from "./Topics";

import "./styles.scss";

const App = () => (
  <div className="root">
    <div className="container">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </div>
);

export const renderMarkup = props => (
  <StaticRouter {...props}>
    <App />
  </StaticRouter>
);

if (typeof document !== "undefined") {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
}
