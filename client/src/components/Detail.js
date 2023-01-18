import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";

const Detail = () => {
  const params = useParams();
  const [showDetail, setShowDetail] = useState({});
  const [castDetails, setCastDetails] = useState({});
  const [crewDetails, setCrewDetails] = useState({});
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
      .then((response) => setCastDetails(response));
  }, [params.id]);

  const [size, setSize] = useState(0);
  const pizza = {
    id: 1,
    img: "/img/pizza.png",
    name: "CAMPAGNOLA",
    price: [19.9, 23.9, 27.9],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  };
  return (
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
        <span className="price">${pizza.price[size]}</span>
        <p className="desc">{showDetail.summary}</p>
        {/* <h3 className="choose">Choose the size</h3>
        <div className="sizes">
          <div className="size" onClick={() => setSize(0)}>
            <img src="/img/size.png" layout="fill" alt="" />
            <span className="number">Small</span>
          </div>
          <div className="size" onClick={() => setSize(1)}>
            <img src="/img/size.png" layout="fill" alt="" />
            <span className="number">Medium</span>
          </div>
          <div className="size" onClick={() => setSize(2)}>
            <img src="/img/size.png" layout="fill" alt="" />
            <span className="number">Large</span>
          </div>
        </div>
        <h3 className="choose">Choose additional ingredients</h3>
        <div className="ingredients">
          <div className="option">
            <input
              type="checkbox"
              id="double"
              name="double"
              className="checkbox"
            />
            <label htmlFor="double">Double Ingredients</label>
          </div>
          <div className="option">
            <input
              className="checkbox"
              type="checkbox"
              id="cheese"
              name="cheese"
            />
            <label htmlFor="cheese">Extra Cheese</label>
          </div>
          <div className="option">
            <input
              className="checkbox"
              type="checkbox"
              id="spicy"
              name="spicy"
            />
            <label htmlFor="spicy">Spicy Sauce</label>
          </div>
          <div className="option">
            <input
              className="checkbox"
              type="checkbox"
              id="garlic"
              name="garlic"
            />
            <label htmlFor="garlic">Garlic Sauce</label>
          </div>
        </div>
        <div className="add">
          <input type="number" defaultValue={1} className="quantity" />
          <button className="button">Add to Cart</button>
        </div> */}
      </div>
    </div>
  );
};

export default Detail;
