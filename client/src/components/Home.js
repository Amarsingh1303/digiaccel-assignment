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
  // const generesArray = apiData?.map((data) => data.genres);
  // console.log("generes", generesArray);
  // const generesList = generesArray.map((item) => item.map((item) => item));
  // console.log("generesList", generesList);

  const getGeneresList = () => {
    let generesList = [];
    const generesArray = apiData?.map((data) => data.genres);
    generesArray.forEach((item) => {
      item?.map((each) => generesList.push(each));
    });
    console.log("generesList", generesList);
    return [...new Set(generesList)];
    //  generesArray.map((item) => item.map((item) => item));
  };
  const genresList = getGeneresList();
  console.log("genresList", genresList);
  return (
    <div style={{ backgroundColor: "green" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "70px",
          backgroundColor: "red",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <div style={{ fontSize: "24px" }}>TV MAZE</div>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={searchIcon}
              width={25}
              height={25}
              style={{ marginRight: "8px" }}
            />
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* {apiData.map((item) => {
        return <img src={item.image.medium} />;
      })} */}
      {genresList.map((generItem) => {
        return (
          <div>
            <h1>{generItem}</h1>
            <Slider {...settings}>
              {apiData.map((item) => {
                if (item.genres.includes(generItem)) {
                  console.log("res", generItem === "Music" ? item : "");
                  return (
                    <div
                      // onClick={() => navigate(`${item.id}/detail`)}
                      style={{ backgroundColor: "gray" }}
                    >
                      <img src={item?.image?.medium} />
                    </div>
                  );
                }
              })}
            </Slider>
          </div>
        );
      })}
      {/* <Slider {...settings}>
        {apiData.map((item) => {
          return (
            <div
              onClick={() => navigate(`${item.id}/detail`)}
              style={{ backgroundColor: "red" }}
            >
              <img src={item.image.medium} />
            </div>
          );
        })}
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider> */}
    </div>
  );
};

export default Home;
