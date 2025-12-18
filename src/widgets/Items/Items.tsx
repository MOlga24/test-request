import React from "react";
import { TItem } from "../../entities/item/model/types";
import styles from "./Items.module.css"
import Item from "../../entities/item/ui/Item/Item";

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
