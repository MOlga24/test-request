import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { TItem } from "../utils/types";
interface ItemProps {
  item: TItem;
}

const Item = ({ item }: ItemProps) => {
  return (
    <div className="item">
      <Link
        to={`/requests/${item.id}`}
        state={{ item }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="wrapper">
        <h2 className="item__title">{item.title}</h2>
        <label className="subtitle">Дата заявки:</label>
        <p className="item__description">{item.date}</p>
        <label className="subtitle">Описание заявки:</label>
        <p className="item__description">{item.description}</p>
        <label className="subtitle">Категория заявки:</label>
        <p className="item__description"> {item.category}</p></div>
      </Link>
    </div>
  );
};

export default React.memo(Item);
