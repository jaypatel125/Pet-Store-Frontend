// I Jay Patel, 000881881 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React from "react";
import pets from "../pets.png";
import "../App.css";
const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to our Pet Store!</h1>
      <img className="img" src={pets} alt="Pet Store" />
    </div>
  );
};

export default Home;
