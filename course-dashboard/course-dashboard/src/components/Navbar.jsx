import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <span className="brand">Learnpath</span>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/courses">My courses</NavLink>
        <NavLink to="/courses/new">Add course</NavLink>
      </nav>
    </header>
  );
}
