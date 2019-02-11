import React from "react";
import { Divider } from "antd";
import Background from "../data/images/plant.jpg"; // get image;

const Header = () => {
  return (
    <div
      className="App-Header"
      style={{
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Divider style={{ marginBottom: "20px" }}>
        <h1 style={{ color: "#ffffff" }}>
          Aquaponics <br />
        </h1>
        <span
          style={{
            color: "#ffffff",
            fontSize: "120%",
            fontStyle: "italic"
          }}
        >
          Natürlicher Nährstoffkreislauf
        </span>
      </Divider>
    </div>
  );
};

export default Header;
