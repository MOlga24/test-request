import React from "react";
import Item from "../Item";
import { TItem } from "../../utils/types";
import styles from "./Items.module.css"
interface ItemsProps {
  items: TItem[];
}

export const Items = React.memo(({ items }: ItemsProps) => {
  if (!items || !Array.isArray(items)) {
    return <div className={styles.empty}>Заявки отсутствуют</div>;
  }

  if (items.length === 0) {
    return <div className={styles.empty}>Заявки не найдены</div>;
  }

  return (
    <main className={styles.Wrapper}>
      <div className={styles.itemsWrapper}>
        {items.map((el) => (
          <div key={el.id} className={styles.item}>
            <Item item={el} />
          </div>
        ))}
      </div>
    </main>
  );
});

export default Items;
