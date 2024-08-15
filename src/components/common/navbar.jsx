import React, { useState } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu, { Navlinks } from "./responsivemenu";
import { useTheme } from "../../App"; // Correctly import the useTheme hook

const Navbar = () => {
  const { theme, setTheme } = useTheme(); // Destructure theme and setTheme

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Define theme-specific styles
  const themeStyles = {
    light: "text-white bg-[#6482AD]",
    dark: "text-white bg-[#071952]",
  };

  return (
    <div
      className={`relative z-10 flex justify-center w-full duration-300 shadow-md ${themeStyles[theme]}`}
    >
      <div className="container py-2 md:py-0 md:px-12 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-xl font-bold sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
              Text Decator
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {/* Nav links */}
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className="py-2 text-lg font-medium transition-colors duration-500 hover:text-primary hover:border-b-2 hover:border-primary"
                  >
                    {name}
                  </a>
                </li>
              ))}
              {/* DarkMode feature */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={toggleTheme}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <BiSolidMoon
                  onClick={toggleTheme}
                  className="text-2xl cursor-pointer"
                />
              )}
            </ul>
          </nav>
          {/* Mobile view */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Dark mode */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={toggleTheme}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <BiSolidMoon
                onClick={toggleTheme}
                className="text-2xl cursor-pointer"
              />
            )}
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="transition-all cursor-pointer"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="transition-all cursor-pointer"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
