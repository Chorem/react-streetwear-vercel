import React from "react";

type CategoriesProps = {
  value: number;
  onClick: (index: number) => void;
};

const categories = ["All", "Hoodies", "T-shirts", "Jackets", "Pants"];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClick }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onClick(index)}
            className={value === index ? "active" : ""}
            >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})
