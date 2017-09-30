import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export default () => (
  <header className="row align-items-center">
    <div className="col">
      <Link className={styles.home} to="/" />
    </div>
    <nav className="col-auto">
      <Link to="/about">About</Link>
      <Link to="/topics">Topics</Link>
    </nav>
  </header>
);
