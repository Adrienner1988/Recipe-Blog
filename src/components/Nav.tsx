import { NavLink } from "react-router-dom";
import { useState } from "react";
import { RiMenu5Fill, RiMenuFold4Line } from "react-icons/ri";
import { LuChefHat } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <>
      <nav>
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 flex h-16 items-center justify-between">
            {/* Logo and site title */}
            <NavLink to="/" className="flex items-center space-x-2">
              <LuChefHat className="h-6 w-6 text-primary" />
              <span className="font-bold font-sans text-lg">
                Recipe Rainbow
              </span>
            </NavLink>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {[
                { to: "/", label: "Home" },
                { to: "/recipes", label: "Recipes" },
                { to: "/add", label: "Submit Recipe" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative transition-colors px-3 py-2 rounded-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${isActive
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-primary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* User Authentication Links */}

              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.displayName || "User"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-muted-foreground hover:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Login
                </button>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <RiMenuFold4Line /> : <RiMenu5Fill />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t bg-background px-4"
              >
                <nav className="flex flex-col items-center space-y-4 py-4">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/recipes", label: "Recipes" },
                    { to: "/add", label: "Submit Recipe" },
                    // Future: Auth-based links here
                  ].map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        `transition-colors hover:text-primary px-3 py-2 rounded-full ${isActive
                          ? "text-primary bg-primary/10"
                          : "hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </nav>
    </>
  );
};

export default Nav;
