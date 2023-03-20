import React from "react";
import { Routes, Route } from "react-router-dom";

import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import { Navbar, Sidebar } from "./components";

const App = () => {
  return (
    <div className="relative flex min-h-screen flex-row bg-[#13131a] p-4 dark:bg-light sm:p-8">
      {alert(
        `Attention! Before you get started, let me tell you that BlockStarter is my minimum viable product, created to demonstrate my expertise in combining front-end development and blockchain connectivity. Kindly note that to test BlockStarter, you'll need to have Goerli ETH at your disposal from https://goerlifaucet.com/.`
      )}
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>
      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
