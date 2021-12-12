import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink exact to="/" className="nav-link">
          Главная
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="catalog" className="nav-link">
          Каталог
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/about" className="nav-link">
          О магазине
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/contacts" className="nav-link" href="/contacts.html">
          Контакты
        </NavLink>
      </li>
    </ul>
  );
}
