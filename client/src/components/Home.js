import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSearchText } from "./Navbar/navbarSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const searchText = useSelector(selectSearchText);

  useEffect(() => {
    if (!searchText)
      fetch("https://api.tvmaze.com/shows")
        .then((res) => res.json())
        .then((response) => setApiData(response));
    else
      fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
        .then((res) => res.json())
        .then((response) => {
          setApiData(response.map((item) => item.show));
        });
  }, [searchText]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const getGenresList = () => {
    let genresList = [];
    const genresArray = apiData?.map((data) => data.genres);
    genresArray.forEach((item) => {
      item?.map((each) => genresList.push(each));
    });
    return [...new Set(genresList)];
  };
  const genresList = getGenresList();
  return (
    <div style={{ backgroundColor: "#d8d8d8" }}>
      <div style={{ padding: "20px" }}>
        {genresList?.map((genreItem) => {
          return (
            <div key={genreItem}>
              <h1>{genreItem}</h1>
              <Slider {...settings}>
                {apiData.map((item) => {
                  if (item.genres.includes(genreItem)) {
                    return (
                      <div style={{ backgroundColor: "green" }} key={item.id}>
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
