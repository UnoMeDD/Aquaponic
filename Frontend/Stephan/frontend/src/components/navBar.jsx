import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";

const NavBar = () => {
  // <NavLink> prevents addinonal http request to the server
  return (
    <ul className="nav justify-content-center" style={{ marginBottom: "10px" }}>
      <li className="nav-item">
        {/* icon-link -> Home */}
        <NavLink
          className="nav-link"
          to="/home"
          style={{
            marginRight: "30px"
          }}
        >
          <Icon
            type="home"
            theme="twoTone"
            twoToneColor="#673ab7"
            style={{
              color: "#fff",
              fontSize: "50px"
            }}
          />
        </NavLink>
      </li>
      <li className="nav-item">
        {/* icon-link -> Measurment */}
        <NavLink
          className="nav-link"
          to="/measurment"
          style={{
            marginLeft: "30px",
            marginRight: "30px"
          }}
        >
          <Icon
            type="fund"
            theme="twoTone"
            twoToneColor="#673ab7"
            style={{
              color: "#fff",
              fontSize: "50px"
            }}
          />
        </NavLink>
      </li>
      <li className="nav-item">
        {/* icon-link -> Info */}
        <NavLink
          className="nav-link"
          to="/info-view"
          style={{ marginLeft: "30px" }}
        >
          <Icon
            type="experiment"
            theme="twoTone"
            twoToneColor="#673ab7"
            style={{ color: "#fff", fontSize: "50px" }}
          />
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
