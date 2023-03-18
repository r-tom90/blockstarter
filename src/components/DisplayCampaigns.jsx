import React from "react";
import { useNavigate } from "react-router-dom";

import FundCard from "./FundCard";
import { loader } from "../assets";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    // Pass state through routing
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="text-left font-epilogue text-[18px] font-semibold text-white">
        {/* //? Title and number of campaigns */}
        {title} ({campaigns.length})
      </h1>

      <div className="mt-[20px] flex flex-wrap gap-[26px]">
        {/* displays a loader */}
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="h-[100px] w-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue text-[14px] font-semibold leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, idx) => (
            <FundCard
              key={idx}
              // Key below does not work
              //   key={campaign.id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
