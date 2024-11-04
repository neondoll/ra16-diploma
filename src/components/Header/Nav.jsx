import Paths from "../../paths";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Главная", to: Paths.ROOT },
  { label: "Каталог", to: Paths.CATALOG },
  { label: "О магазине", to: Paths.ABOUT },
  { label: "Контакты", to: Paths.CONTACTS },
];

export default function Nav() {
  const location = useLocation();

  return (
    <ul className="navbar-nav mr-auto">
      {links.map(link => (
        <li className={cn("nav-item", link.to === location.pathname && "active")} key={link.label}>
          <Link className="nav-link" to={link.to}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
