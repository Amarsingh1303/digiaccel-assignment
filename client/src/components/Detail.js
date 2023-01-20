import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    fetch(`https://api.tvmaze.com/shows/${params.id}/cast`)
      .then((res) => res.json())
      .then((response) => setCastDetails(response));
    fetch(`https://api.tvmaze.com/shows/${params.id}/crew`)
      .then((res) => res.json())
      .then((response) => setCrewDetails(response));
  }, [params.id]);

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="imgContainer">
            <img
              src={showDetail?.image?.medium}
              layout="fill"
              alt="showPoster"
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
              crewDetails?.find((crew) => crew.type === "Producer")?.person
                .name}
          </div>
          <div>
            Cast :
            {castDetails.slice(0, 3).map((cast) => (
              <span key={cast.person.id}> {cast.person.name}, </span>
            ))}
          </div>
          <div style={{ marginTop: "20px" }}>{showDetail.summary}</div>
        </div>
      </div>
    </>
  );
};

export default Detail;
