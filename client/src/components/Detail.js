import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import searchIcon from "../components/assets/icons/search.svg";
import "./Details.css";

const Detail = () => {
  const params = useParams();
  const [showDetail, setShowDetail] = useState({});
  const [castDetails, setCastDetails] = useState([]);
  const [crewDetails, setCrewDetails] = useState([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}`)
      .then((res) => res.json())
      .then((response) => setShowDetail(response));
  }, [params.id]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}/cast`)
      .then((res) => res.json())
      .then((response) => setCastDetails(response));
  }, [params.id]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}/crew`)
      .then((res) => res.json())
      .then((response) => setCrewDetails(response));
  }, [params.id]);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "70px",
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
              // onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <div className="imgContainer">
            <img
              src={showDetail?.image?.medium}
              objectFit="contain"
              layout="fill"
              alt=""
            />
          </div>
        </div>
        <div className="right">
          <h1 className="title">
            {showDetail.name} &#40;{showDetail?.rating?.average}&#41;
          </h1>
          <div>
            {new Date(showDetail.premiered).getFullYear()} |{showDetail.runtime}
            min |
            {crewDetails.length > 0 &&
              crewDetails?.find((item) => item.type === "Producer")?.person
                .name}
          </div>
          <div>
            Cast :
            {castDetails.slice(0, 3).map((item) => (
              <span> {item.person.name}, </span>
            ))}
          </div>
          <div style={{ marginTop: "20px" }}>{showDetail.summary}</div>
        </div>
      </div>
    </>
  );
};

export default Detail;
