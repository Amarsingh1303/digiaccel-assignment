import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((response) => setApiData(response));
  }, []);
  console.log("apiData", apiData);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // centerMode: true,
  };
  return (
    <div>
      Home
      {/* {apiData.map((item) => {
        return <img src={item.image.medium} />;
      })} */}
      <Slider {...settings}>
        {apiData.map((item) => {
          return (
            <div onClick={() => navigate(`${item.id}/detail`)}>
              <img src={item.image.medium} />
            </div>
          );
        })}
        {/* <div>
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
        </div> */}
      </Slider>
    </div>
  );
};

export default Home;
