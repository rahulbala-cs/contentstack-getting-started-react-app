import { onEntryChange } from "../../sdk/utils";
import React, { useEffect, useMemo, useState } from "react";
import MenuCard from "./MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { LoadingSkeleton } from "../LoadingSkeleton";
//COMMENT: Uncomment below 2 import statements

import { TMenu } from "../../types";
import { fetchMenuPageData } from "../../api";
import { getEditTags } from "../../sdk/utils";

const Menu: React.FC = () => {
  //COMMENT: Uncomment from line 14 to 96

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const menuPageData = useSelector(
    (state: RootState) => state.main.menuPageData
  );
  useEffect(() => {
    onEntryChange(() => {
      fetchMenuPageData(dispatch, setLoading);
    });
  }, [dispatch]);

  const memoizedMenuPageData = useMemo(() => menuPageData, [menuPageData]);

  const categories = memoizedMenuPageData?.map(
    (course: TMenu) => course.course_name
  );
  const dishes = memoizedMenuPageData?.map((course: TMenu) => course.dishes);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="menu-page" {...getEditTags(memoizedMenuPageData[0], 'page')}>
      <div className="menu-tabs">
        {categories.map((category: string, index: number) => (
          <button
            key={index}
            className={`tab-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            {...getEditTags(memoizedMenuPageData[index], 'course_name')}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="menu-content">
        <MenuCard
          data={dishes[activeIndex]}
          courseData={memoizedMenuPageData[activeIndex]}
        />
      </div>
    </div>
  );
};

export default Menu;
