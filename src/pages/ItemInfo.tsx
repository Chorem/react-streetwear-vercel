import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const ItemInfo: React.FC = () => {
  const [item, setItem] = React.useState<{
    imageUrl?: string;
    title: string
    price: number
    types: []
    sizes: []
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const typeNames = ["default", "oversize"];
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://628dd927a339dfef87a18e03.mockapi.io/items/" + id
        );
        setItem(data);
      } catch (error) {
        navigate("/");
      }
    }
    fetchData();
  }, []);

  if (!item) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container item-wrapper it-w">
      <img className="items-image" src={item.imageUrl} alt={item.imageUrl} />
      <div className="items-info">
        <h2>{item.title}</h2>
        <h4>{item.price}$</h4>
        <div>
          <h6>Type:</h6>
          <div className="clothes-block__selector">
            <ul className="selector-ul">
              {item.types.map((i) => (
                <li
                  key={i}
                  onClick={() => setActiveType(i)}
                  className={activeType === i ? "active" : ""}
                >
                  {typeNames[i]}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="size-selector">
          <h6>Size:</h6>
          <div className="clothes-block__selector">
            <ul className="selector-ul">
              {item.sizes.map((size, i) => (
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
        </div>
         <Link to='/'>
         <button className="button button--outline back-item-btn">Back</button>
         </Link>
      </div>
    </div>
  );
};

export default ItemInfo;
