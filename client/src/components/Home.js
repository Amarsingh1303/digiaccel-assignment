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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchText) {
      setLoading(true);
      fetch("https://api.tvmaze.com/shows")
        .then((res) => res.json())
        .then((response) => {
          setApiData(response);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
        .then((res) => res.json())
        .then((response) => {
          setApiData(response.map((item) => item.show));
          setLoading(false);
        });
    }
  }, [searchText]);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
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

  if (loading) {
    return <h1>Loading Content...</h1>;
  }

  return (
    <div style={{ backgroundColor: "#d8d8d8" }}>
      <div style={{ padding: "20px" }}>
        {genresList.length > 0 ? (
          genresList?.map((genreItem) => {
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
          })
        ) : (
          <h1>No Content Found</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
