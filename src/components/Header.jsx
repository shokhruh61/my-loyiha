import React, { useEffect } from "react";
import Logo from "../assets/images/logo.svg";
import Dark from "../assets/images/dark.svg";
import Light from "../assets/images/light.svg";
import Man from "../assets/images/man.svg";
import useStore from "../store/useStore"; 

function Header() {
  const { isDarkMode, toggleDarkMode, setDarkMode } = useStore();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, [setDarkMode]);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header
      className={`flex flex-col items-center w-[103px] h-screen fixed left-0 top-0 shadow-lg ${
        isDarkMode ? "bg-gray-900" : "bg-gray-800"
      }`}
    >
      <a href="/" className="mb-8">
        <img
          className="w-[103px] h-[103px]"
          src={Logo}
          alt="Invoice App Logo"
        />
      </a>

      <div className="flex flex-col items-center space-y-6 mt-auto mb-4">
        <img
          src={isDarkMode ? Light : Dark}
          alt="Dark mode toggle"
          className="w-6 h-6 cursor-pointer"
          onClick={toggleDarkMode}
        />
        <img
          src={Man}
          alt="User profile"
          className="w-8 h-8 rounded-full border border-gray-600"
        />
      </div>
    </header>
  );
}

export default Header;
