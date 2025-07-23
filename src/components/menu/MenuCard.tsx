import React from "react";
import { TDishes, TMenu } from "../../types";
import { getEditTags } from "../../sdk/utils";

interface MenuCardProps {
  data: TDishes[];
  courseData?: TMenu;
}

const MenuCard: React.FC<MenuCardProps> = ({ data, courseData }) => {
  return (
    <div className="menu-card">
      {data ? (
        data.map((menuItem: TDishes, index: number) => (
          <div 
            key={`dish-${index}`}
            className="menu-card-item"
            {...getEditTags(menuItem)}
          >
            <div
              style={{
                background: `url(${menuItem.image.url}) lightgray 50% / cover no-repeat`,
                height: "320px",
                alignSelf: "stretch",
              }}
              {...getEditTags(menuItem, `image`)}
            />
            <div className="menu-card-content">
              <h2 {...getEditTags(menuItem, 'title')}>{menuItem.title}</h2>
              <p {...getEditTags(menuItem, 'description')}>{menuItem.description}</p>
              <h3 {...getEditTags(menuItem, 'price')}>{`$ ${menuItem.price}`}</h3>
            </div>
          </div>
        ))
      ) : (
        <p>No dishes available for this course.</p>
      )}
    </div>
  );
};

export default MenuCard;
