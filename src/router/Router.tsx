import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChannelSearchPage from "../pages/ChannelSearchPage";
import MainPage from "../pages/MainPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<ChannelSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
