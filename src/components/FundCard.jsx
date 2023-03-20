import React from "react";

import { tagType, logoBlack } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="w-full cursor-pointer rounded-[15px] bg-[#1c1c24] dark:bg-neutral-700 sm:w-[288px]"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="h-[158px] w-full rounded-[15px] object-cover"
      />

      <div className="flex flex-col p-4">
        <div className="mb-[18px] flex flex-row items-center">
          <img
            src={tagType}
            alt="tag"
            className="h-[17px] w-[17px] fill-black object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue text-[12px] font-medium text-[#808191] dark:text-[#030720]">
            {/* TODO: Change tagType based on category chosen through dropdown, for now hard coded Education */}
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="truncate text-left font-epilogue text-[16px] font-semibold leading-[26px] text-white">
            {title}
          </h3>
          <p className="mt-[5px] truncate text-left font-epilogue font-normal leading-[18px] text-[#808191] dark:text-[#030720]">
            {description}
          </p>
        </div>

        <div className="mt-[15px] flex flex-wrap justify-between gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-[#b2b3bd]">
              {/* TODO: Hard coded ETH for now, future works would be a choice of crypto to donate with */}
              {amountCollected} ETH
            </h4>
            <p className="mt-[3px] truncate font-epilogue text-[12px] font-normal leading-[18px] text-[#808191] dark:text-[#030720] sm:max-w-[120px]">
              {/* TODO: Hard coded ETH for now, future works would be a choice of crypto to donate with */}
              Raised of {target} ETH
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-[#b2b3bd]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] truncate font-epilogue text-[12px] font-normal leading-[18px] text-[#808191] dark:text-[#030720] sm:max-w-[120px]">
              Days Left
            </p>
          </div>
        </div>

        <div className="mt-[20px] flex items-center gap-[12px]">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#13131a]">
            <img
              // TODO: Hard coded logo for now, future works would be a choice of display pic or wallet QR code
              src={logoBlack}
              alt="user"
              className="h-1/2 w-1/2 object-contain"
            />
          </div>
          <p className="flex-1 truncate font-epilogue text-[12px] font-normal text-[#808191] dark:text-[#030720]">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
