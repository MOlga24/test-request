import React, {
  useEffect,
  useState,
  MouseEvent as ReactMouseEvent,
  useCallback,
} from "react";

import { Breadcrumbs } from "../utils/bredcrumps";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowItem from "../components/ShowItem";
import { AppDispatch, RootState } from "../services/store";

import {

} from "../services/slices/itemsSlice";

const handleContainerClick = (e: ReactMouseEvent<HTMLDivElement>) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".search_results")) {
    const searchResults = document.querySelector(
      ".search_results"
    ) as HTMLElement;
    if (searchResults) {
      searchResults.style.display = "none";
    }
  }
};

export const ItemFull = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item);
  const { id } = useParams();
  const items = useSelector((state: RootState) => state.items.items); 

  const foundItem = useSelector((state: RootState) =>
    id ? state.items.items.find((item) => item.id === id) : null
  );

  useEffect(() => {
    if (!item && foundItem) {
      setItem(foundItem);
    }
  }, [item, foundItem]);

  const breadcrumbsItems = [
    { label: "Главная", link: "/requests" },
    { label: `Заявка № ${item?.id}` || "Заявка №" },
  ];

  

  useEffect(() => {
    if (item && items) {
      const updatedItem = items.find((i) => i.id === item.id);
      if (updatedItem) {
        setItem(updatedItem);
      }
    }
  }, [items, item]);

  useEffect(() => {
    if (id && items && !item) {
      const foundItem = items.find((item) => item.id === id);
      setItem(foundItem || null);
    }
  }, [id, items, item]);

  if (!item) {
    return <div>Заявки не найдены</div>;
  }

  return (
    <div className="page_wrapper" onClick={handleContainerClick}>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className="item_full_main_title">
        <p className="title">Заявка №{item.id}</p>
      </div>


      <ShowItem
        item={item}       
       
      />
    </div>
  );
};
