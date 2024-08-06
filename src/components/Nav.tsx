import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="bg-darkPlum text-grayLight text-lg">
        <ul className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 ">
          <li className="nav-list font-bold float-start ">Recipe Rainbow</li>

          <div className="flex space-x-4">
            <li className="nav-list">
              <NavLink
                to={"/"}
                className="px-3 py-3 rounded-full hover:bg-lightPlum text-grayLight hover:text-green transition-colors duration-300"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-list">
              <NavLink
                to={"/recipes"}
                className="px-3 py-3 rounded-full hover:bg-lightPlum hover:text-green transition-colors duration-300"
              >
                Recipes
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
