import React from "react";
import { Link } from "react-router-dom";

import { FiTrash2, FiEdit2, FiHome } from "react-icons/fi";
import styles from "./Item.module.css";
import { TItem } from "../../model/types";
export type ItemMode = "compact" | "detailed" | "full";
interface ItemProps {
  item: TItem;
  onEdit?: (item: TItem) => void;
  onDelete?: (id: string) => void;
  onNavigateHome?: () => void;
  mode?: ItemMode;
  className?: string;
}
const Item: React.FC<ItemProps> = ({
  onEdit,
  onDelete,
  item,
  mode = "compact",
  onNavigateHome,
  className = "",
}) => {
  const FiEditIcon = FiEdit2 as React.ElementType;
  const FiTrashIcon = FiTrash2 as React.ElementType;
  const FiHomeIcon = FiHome as React.ElementType;
  const renderCommonContent = () => (
    <>
      <h2 className={styles.title}>{item.title}</h2>
      <span className={styles.subtitle}>Дата создания заявки:</span>{" "}
      <p>{item.date}</p>
      <span className={styles.subtitle}>Категория заявки:</span>
      <p className={styles.description}> {item.category}</p>
      <span className={styles.subtitle}>Описание заявки:</span>
    </>
  );
  const renderByMode = () => {
    switch (mode) {
      case "compact":
        return (
          <div className={styles.wrapper}>
            {renderCommonContent()}
            <p className={styles.description} title={item.description}>
              {item.description.substring(0, 50)}...
            </p>
          </div>
        );

      case "full":
        return (
          <div className={styles.itemFull}>
            <div className={styles.itemFullDescription}>
              <h2 className={styles.title}>{item.title}</h2>
              <h3 className={styles.subTitle}>Создана:</h3>
              <span> {item.date}</span>
              <h3 className={styles.subTitle}>Категория заявки</h3>
              <span>{item.category}</span>
              <h3 className={styles.subTitle}>Описание заявки</h3>
              <p className={styles.itemFullDescription}>{item.description}</p>
            </div>

            {(onEdit || onDelete || onNavigateHome) && (
              <div className={styles.menu}>
                {onEdit && (
                  <button
                    className={`${styles.edit} ${styles.button}`}
                    onClick={() => onEdit(item)}
                  >
                    <FiEditIcon
                      onClick={() => onEdit(item)}
                      className={styles.icon}
                      stroke="#e0d9d9ff"
                    />{" "}
                    Редактировать
                  </button>
                )}
                {onDelete && (
                  <button
                    className={`${styles.delete} ${styles.button}`}
                    onClick={() => onDelete(item.id)}
                  >
                    <FiTrashIcon
                      onClick={() => onDelete(item.id)}
                      stroke="#e0d9d9ff"
                      className={styles.icon}
                    />{" "}
                    Удалить
                  </button>
                )}
                {onNavigateHome && (
                  <button
                    className={`${styles.home} ${styles.button}`}
                    onClick={onNavigateHome}
                  >
                    <FiHomeIcon
                      stroke="#e0d9d9ff"
                      className={styles.icon}
                      onClick={onNavigateHome}
                    />{" "}
                    На главную
                  </button>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };
  if (mode === "compact") {
    return (
      <Link
        to={`/requests/${item.id}`}
        state={{ item }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {renderByMode()}
      </Link>
    );
  }
  return renderByMode();
};

export default React.memo(Item);
