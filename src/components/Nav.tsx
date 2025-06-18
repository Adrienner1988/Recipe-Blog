import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RiMenu5Fill, RiMenuFold4Line } from "react-icons/ri";


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
    <nav>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <NavLink to="/" className="mr-6 flex items-center space-x-2">
              {/* <CookingPot className="h-6 w-6 text-primary" /> */}
              <span className="font-bold font-sans">Recipe Rainbow</span>
            </NavLink>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive ? 'text-primary bg-primary/10' : 'hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/recipes"
                className={({ isActive }) =>
                  `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive ? 'text-primary bg-primary/10' : 'hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                Recipes
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive ? 'text-primary bg-primary/10' : 'hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                Submit Recipe
              </NavLink>
              <a href="#about" className="transition-colors hover:text-primary px-3 py-2 rounded-full hover:bg-accent hover:text-accent-foreground">About</a>
              <a href="#categories" className="transition-colors hover:text-primary px-3 py-2 rounded-full hover:bg-accent hover:text-accent-foreground">Categories</a>
            </nav>
          </div>
    
                {/* Side Menu */}
          <button
            className="md:hidden ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
              {isOpen ? <RiMenuFold4Line /> : <RiMenu5Fill />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col items-center space-y-4 py-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive ? 'text-primary bg-primary/10' : 'hover:bg-accent hover:text-accent-foreground'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/recipes"
                className={({ isActive }) =>
                  `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive ? 'text-primary bg-primary/10' : 'hover:bg-accent hover:text-accent-foreground'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Recipes
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive ? 'text-primary bg-primary/10' : 'hover:bg-accent hover:text-accent-foreground'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Add Recipe
              </NavLink>
              <a href="#about" className="transition-colors hover:text-primary px-3 py-2 rounded-full hover:bg-accent hover:text-accent-foreground" onClick={() => setIsOpen(false)}>About</a>
              <a href="#categories" className="transition-colors hover:text-primary px-3 py-2 rounded-full hover:bg-accent hover:text-accent-foreground" onClick={() => setIsOpen(false)}>Categories</a>
            </nav>
          </div>
        )}
      </header>
      </nav>
    </>
  );
};

export default Nav;
