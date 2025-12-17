import React from "react";
import Item from "./Item";
import { TItem } from "../utils/types";

interface ItemsProps {
  items: TItem[];
}

export const Items = React.memo(({ items }: ItemsProps) => {
  if (!items || !Array.isArray(items)) {
    return <div className="empty">Заявки отсутствуют</div>;
  }

  if (items.length === 0) {
    return <div className="empty">Заявки не найдены</div>;
  }

  return (
    <main className="page_wrapper">
      <div className="itemsWrapper">
        {items.map((el) => (
          <Item key={el.id} item={el} />
        ))}
      </div>
    </main>
  );
});

export default Items;
