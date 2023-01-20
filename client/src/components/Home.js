import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "../components/assets/icons/search.svg";
const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((response) => setApiData(response));
  }, []);

  useEffect(() => {
    if (searchText)
      fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
        .then((res) => res.json())
        .then((response) => {
          console.log("response");
          setApiData(response.map((item) => item.show));
        });
  }, [searchText]);
  console.log("apiData", apiData);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // centerMode: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
  };

  const getGeneresList = () => {
    let generesList = [];
    const generesArray = apiData?.map((data) => data.genres);
    generesArray.forEach((item) => {
      item?.map((each) => generesList.push(each));
    });
    return [...new Set(generesList)];
  };
  const genresList = getGeneresList();
  return (
    <div style={{ backgroundColor: "#d8d8d8" }}>
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
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        {genresList.map((generItem) => {
          return (
            <div>
              <h1>{generItem}</h1>
              <Slider {...settings}>
                {apiData.map((item) => {
                  if (item.genres.includes(generItem)) {
                    return (
                      <div style={{ backgroundColor: "green" }}>
                        <img
                          src={item?.image?.medium}
                          onClick={() => navigate(`${item.id}/detail`)}
                          alt="showPoster"
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </Slider>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
