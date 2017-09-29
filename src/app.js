import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Link } from "react-router-dom";
import { StaticRouter } from "react-router";

import Home from "./Home";
import About from "./About";
import Topics from "./Topics";

import "./styles.scss";

const App = () => (
  <div className="root">
    <div className="container">
      <header className="row align-items-center">
        <div className="col">
          <Link className="home-link" to="/" />
        </div>
        <nav className="col-auto">
          <Link to="/about">About</Link>
          <Link to="/topics">Topics</Link>
        </nav>
      </header>
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
