import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import logo from "../images/hamster_wars.png";
import Button from "../components/Button/Button";

function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <header className="page-header">
        <Link to="/">
          <img src={logo} alt="" className="nav-image" />
        </Link>

        <nav>
          <ul className="nav-bar">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/vote">Vote</Link>
            </li>
            <li className="nav-item">
              <Link to="/result">Result</Link>
            </li>
          </ul>
        </nav>
        <Button
          text="Sign in"
          onClick={() => {
            navigate("/login");
          }}
        />
      </header>

      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
