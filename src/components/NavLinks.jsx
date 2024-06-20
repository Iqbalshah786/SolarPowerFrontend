import { Link } from "react-router-dom";
import { links } from "../constants";

const NavLinks = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center gap-4 flex-shrink-0">
        {links.map(({ link, url }) => (
          <li key={url}>
            <Link to={url}>{link}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
