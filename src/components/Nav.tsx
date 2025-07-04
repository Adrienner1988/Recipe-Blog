import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RiMenu5Fill, RiMenuFold4Line } from "react-icons/ri";
import { LuChefHat } from "react-icons/lu";


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav>
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-8">
            {/* Left: Logo */}
            <NavLink to="/" className="flex items-center space-x-2 pl-1 md:pl-4">
              <LuChefHat className="h-6 w-6 text-primary" />
              <span className="font-bold font-sans">Recipe Rainbow</span>
            </NavLink>

            {/* Right: Links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {["/", "/recipes", "/add"].map((path, index) => {
                const labels = ["Home", "Recipes", "Submit Recipe"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive
                        ? "text-primary bg-primary/10"
                        : "hover:bg-accent hover:text-accent-foreground"
                      }`
                    }
                  >
                    {labels[index]}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right: Menu Button (Mobile) */}
            <button
              className="md:hidden ml-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <RiMenuFold4Line /> : <RiMenu5Fill />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="md:hidden border-t px-4 pb-4">
              <nav className="flex flex-col space-y-4 pt-4 text-center">
                {["/", "/recipes", "/add"].map((path, index) => {
                  const labels = ["Home", "Recipes", "Submit Recipe"];
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive
                          ? "text-primary bg-primary/10"
                          : "hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      {labels[index]}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          )}
        </header>
      </nav>
    </>
  );
};

export default Nav;
