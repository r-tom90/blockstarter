// ? Best practice for all smart contract interactions should be in one single file.

import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
// utility library that allows us to interact with our smart contract
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // Copied from thirdweb build section
  const { contract } = useContract(
    "0x5578d3A4cFB56c02Ff14Ec6999B1102bCC7a7d0F"
  );

  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publicCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target, // target
        new Date(form.deadline).getTime(), // deadline
        form.image, // image
      ]);
      console.info("contract call success", data);
    } catch (error) {
      console.error("contract call failure", err);
    }
  };
  // * 2 methods to call a contract, one above and another way to call the contract below
  // const call = async () => {
  //     try {
  //       const data = await createCampaign([ _owner, _title, _description, _target, _deadline, _image ]);
  //       console.info("contract call success", data);
  //     } catch (err) {
  //       console.error("contract call failure", err);
  //     }
  //   }
  return (
    <StateContext.Provider
      value={{ address, contract, connect, createCampaign: publicCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
