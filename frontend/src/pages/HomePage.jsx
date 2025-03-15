import React from "react";
import Slider from "../component/Slider";
import BusinessSection from "../component/BusinessSection";
import StoreCard from "../component/StoreCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to="/">
        <Slider />
        <StoreCard />
        <BusinessSection />
      </Link>
    </div>
  );
};

export default HomePage;
