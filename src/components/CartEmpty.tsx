import React from "react";
import { Link } from "react-router-dom";
import cartEmptyImg from "../assets/img/empty-cart.png";

export const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Cart is empty 😕</h2>
        <p>
          It seems that you have not chosen anything.
          <br />
          To order something, go to the main page.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Back</span>
        </Link>
      </div>
    </>
  );
};

