import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li className="nav-list">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="nav-list">
            <NavLink to={"/recipes"}>Recipes</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
