import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";
import { selectCartItemById } from "../../redux/cart/selectors";

type ClothesBlockProps = { 
  id: string, 
  title: string, 
  price: number, 
  types: number[], 
  imageUrl: string, 
  sizes: string[] 
};

export const ClothesBlock: React.FC<ClothesBlockProps> = ({ id, title, price, types, imageUrl, sizes }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const addedItems = cartItem ? cartItem.quantity : 0;
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const typeNames = ["default", "oversize"];

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      quantity: 0
    };
    dispatch(addItem(item));
  };
  return (
    <div className="clothes-block-wrapper">
      <div className="clothes-block">
        <Link key={id} to={`/items/${id}`}>
          <div className="img-wrapper">
            <img
              className="clothes-block__image"
              src={imageUrl}
              alt="t-shirt"
            />
          </div>
          <h4 className="clothes-block__title">no title</h4>
        </Link>

        <div className="clothes-block__selector">
          <ul>
            {types.map((i) => (
              <li
                key={i}
                onClick={() => setActiveType(i)}
                className={activeType === i ? "active" : ""}
              >
                {typeNames[i]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="clothes-block__bottom">
          <div className="clothes-block__price">from {price} $</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>add</span>
            {addedItems > 0 && <i>{addedItems}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
