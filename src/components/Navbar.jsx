import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";

import { CustomButton } from "./";

import { logo, menu, search, thirdweb } from "../assets";

import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row">
      <div className="flex h-[52px] max-w-[458px] flex-row rounded-[100px] bg-[#1c1c24] py-2 pl-4 pr-2 lg:flex-1">
        <input
          type="text"
          placeholder="Search for Campaigns"
          className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
        />
        <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#1dc071] hover:bg-[#1ab071] active:bg-[#0aa071]">
          <img
            src={search}
            alt="search"
            className="h-[15px] w-[15px] object-contain"
          />
        </div>
      </div>
      <div className="hidden flex-row justify-end gap-4 sm:flex">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={
            address
              ? "bg-[#1dc071] hover:bg-[#1ab071] active:bg-[#0aa071]"
              : "bg-[#8b6dfd]"
          }
          //   handleClick, if address exists, navigate to create-campaign, else connect to web3 wallet,
          handleClick={() => {
            address ? navigate("create-campaign") : connect();
          }}
        />
        <Link to="/profile">
          <div className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#2c2f32]">
            {/* TODO:
                currently static user image allow for change later one
                 */}
            <img
              src={thirdweb}
              alt="user"
              className="h-[60%] w-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* //? Small screen navigation */}
      <div className="relative flex items-center justify-between sm:hidden">
        <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
          {/* TODO:
                currently static user image allow for change later one
                 */}
          <img
            src={logo}
            alt="user"
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
        {/* TODO: Change hamburger to 'X' when setToggleDrawer is true */}
        <img
          src={menu}
          alt="menu"
          className="h-[34px] w-[34px] cursor-pointer object-contain"
          onClick={() => setToggleDrawer(!toggleDrawer)}
          // ? Best practice below for toggling state
          //   onClick={() => setToggleDrawer((prev) => !prev)}
        />
      </div>

      <div
        className={`absolute top-[60px] right-0 left-0 z-10 bg-[#1c1c24] py-4 shadow-secondary ${
          !toggleDrawer ? "-translate-y-[100vh]" : "-translate-y-0"
        } transition-all duration-700`}
      >
        <ul className="mb-4">
          {navlinks.map((link) => (
            <li
              key={link.name}
              className={`flex cursor-pointer p-4 ${
                isActive === link.name && "bg-[#3a3a43]"
              }`}
              onClick={() => {
                setIsActive(link.name);
                // closes the drawer
                setToggleDrawer(false);
                navigate(link.link);
              }}
            >
              <img
                src={link.imgUrl}
                alt={link.name}
                className={`h-[24px] w-[24px] object-contain ${
                  isActive === link.name ? "grayscale-0" : "grayscale"
                }`}
              />
              <p
                className={`ml-[20px] font-epilogue text-[14px] font-semibold ${
                  isActive === link.name
                    ? "text-[#1dc071]"
                    : "text-[#808191] hover:text-[#1dc071] active:text-[#0aa071]"
                }`}
              >
                {link.name}
              </p>
            </li>
          ))}
        </ul>

        <div className="mx-4 flex">
          <CustomButton
            btnType="button"
            title={address ? "Create a campaign" : "Connect"}
            styles={
              address
                ? "bg-[#1dc071] hover:bg-[#1ab071] active:bg-[#0aa071]"
                : "bg-[#8b6dfd]"
            }
            //   handleClick, if address exists, navigate to create-campaign, else connect to web3 wallet,
            handleClick={() => {
              address ? navigate("create-campaign") : connect();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
