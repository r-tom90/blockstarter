import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { logoDark, logoLight, sun, moon } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32] dark:bg-secondary"
    } flex items-center justify-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="h-1/2 w-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`h-1/2 w-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  // dark and light mode
  const [theme, setTheme] = useState(null);

  // Toggle to be set up dependant on users browser setting on start
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      <Link to="/">
        {theme === "dark" ? (
          <Icon styles="w-[px] h-[52px] dark:bg-primary " imgUrl={logoDark} />
        ) : (
          <Icon styles="w-[px] h-[52px] bg-[#2c2f32]" imgUrl={logoLight} />
        )}
      </Link>

      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4 dark:bg-primary">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        {theme === "dark" ? (
          <Icon
            styles="dark:bg-secondary shadow-secondary"
            imgUrl={moon}
            handleClick={handleThemeSwitch}
          />
        ) : (
          <Icon
            styles="bg-[#1c1c24] shadow-secondary"
            imgUrl={sun}
            handleClick={handleThemeSwitch}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
