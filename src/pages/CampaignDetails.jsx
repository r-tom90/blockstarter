import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { logoBlack } from "../assets";

const CampaignDetails = () => {
  // Destructure and allows transfers State through routing with react-router-dom, where useLocation is called as a hook, explained at 2:45:00
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  // Contract calls take some time, always use asynchronous when fetching data
  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {/* If loading status, Loader will be rendered */}
      {isLoading && <Loader />}

      <div className="mt-10 flex w-full flex-col gap-[30px] md:flex-row">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="h-[410px] w-full rounded-xl object-cover"
          />
          <div className="relative mt-2 h-[5px] w-full bg-[#3a3a43]">
            {/* //? % of funded amount */}
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex w-full flex-wrap justify-between gap-[30px] md:w-[150px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-[2] flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row flex-wrap items-center gap-[14px]">
              <div className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#2c2f32]">
                <img
                  // TODO: Hard-Coded logo, change in the future to allow for custom
                  src={logoBlack}
                  alt="user"
                  className="h-[60%] w-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="break-all font-epilogue text-[14px] font-semibold text-white">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue text-[12px] font-normal text-[#808191]">
                  {/* TODO: Hard-Coded Campaigns, allow for future to be displayable of how many campaigns  contributed in the future */}
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="text-justify font-epilogue text-[16px] font-normal leading-[26px] text-[#808191]">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <p className="break-ll font-epilogue text-[16px] font-normal leading-[26px] text-[#b2b3bd]">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="break-ll font-epilogue text-[16px] font-normal leading-[26px] text-[#808191]">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-justify font-epilogue text-[16px] font-normal leading-[26px] text-[#808191]">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col rounded-[10px] bg-[#1c1c24] p-4">
            <p className="fount-medium text-center font-epilogue text-[20px] leading-[30px] text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full rounded-[10px] border border-[#3a3a43] bg-transparent py-[10px] px-[15px] font-epilogue text-[18px] leading-[30px] text-white outline-none placeholder:text-[#4b5264] sm:px-[20px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] rounded-[10px] bg-[#13131a] p-4">
                <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-white">
                  {/* TODO: Change Text */}
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
