import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="list-nav">
          <li>
            <Link style={{textDecoration:'none'}} to="/">Home</Link>
          </li>
          <li>
            <Link style={{textDecoration:'none'}} to="/form">Ajoute de tache</Link>
          </li>
        </ul>
      </nav>
      
    </header>
  );
};

export default Header;
