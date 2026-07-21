import "./index.css";

import { Link } from "react-router-dom";

import Filters from "../Filters";

export default function Header() {
  return (
    <div className="header">
      <nav>
        <Link to="/login">Login</Link>{" "}
        <Link to="/register">Register</Link>
      </nav>
      <Filters></Filters>
    </div>
  );
}
