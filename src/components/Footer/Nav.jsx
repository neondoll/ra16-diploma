import Paths from "../../paths";
import { Link } from "react-router-dom";

const links = [
  { label: "О магазине", to: Paths.ABOUT },
  { label: "Каталог", to: Paths.CATALOG },
  { label: "Контакты", to: Paths.CONTACTS },
];

export default function Nav() {
  return (
    <ul className="nav flex-column">
      {links.map(link => (
        <li className="nav-item" key={link.label}>
          <Link className="nav-link" to={link.to}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
