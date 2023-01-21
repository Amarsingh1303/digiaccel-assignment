import React from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "./navbarSlice";
import searchIcon from "../assets/icons/search.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        height: "100px",
        backgroundColor: "#d8d8d8",
        padding: "5px",
        flexDirection: "column",
        borderBottom: "5px solid black",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "10px",
          alignContent: "center",
          marginTop: "15px",
        }}
      >
        TV MAZE
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={searchIcon}
            width={25}
            height={25}
            style={{ marginRight: "8px" }}
            alt="searchIcon"
          />
          <input
            type="text"
            onChange={(e) => {
              dispatch(setSearchText(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
