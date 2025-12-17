import React from "react";
import { Link } from "react-router-dom";
import { TItem } from "../utils/types";
import { FiTrash2, FiEdit2, FiHome } from "react-icons/fi";
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
      <h2 className="item__title">{item.title}</h2>
      <span className="subtitle">Дата создания заявки:</span>{" "}
      <p className="item__description">{item.date}</p>
      <span className="subtitle">Категория заявки:</span>
      <p className="item__description"> {item.category}</p>
      <span className="subtitle">Описание заявки:</span>
    </>
  );
  const renderByMode = () => {
    switch (mode) {
      case "compact":
        return (
          <div className="wrapper">
            {renderCommonContent()}
            <p className="description" title={item.description}>
              {item.description.substring(0, 50)}...
            </p>
          </div>
        );

      case "full":
        return (
          <div className="full_item">
            <div className="full_item_descriprion">
              <h2 className="title">{item.title}</h2>
              <h3 className="full_item_sub_title">Создана:</h3>
              <span className="full_item_date"> {item.date}</span>
              <h3 className="full_item_sub_title">Категория заявки</h3>
              <span>{item.category}</span>
              <h3 className="full_item_sub_title">Описание заявки</h3>
              <p className="full_item_description">{item.description}</p>
            </div>

            {(onEdit || onDelete || onNavigateHome) && (
              <div className="menu">
                {onEdit && (
                  <button
                    className="edit_request button "
                    onClick={() => onEdit(item)}
                  >
                    <FiEditIcon
                      onClick={() => onEdit(item)}
                      stroke="#e0d9d9ff"
                    />{" "}
                    Редактировать
                  </button>
                )}
                {onDelete && (
                  <button
                    className="delete_request button "
                    onClick={() => onDelete(item.id)}
                  >
                    <FiTrashIcon
                      onClick={() => onDelete(item.id)}
                      stroke="#e0d9d9ff"
                      className="icon"
                    />{" "}
                    Удалить
                  </button>
                )}
                {onNavigateHome && (
                  <button className="home  button" onClick={onNavigateHome}>
                    <FiHomeIcon
                      stroke="#e0d9d9ff"
                      className="icon"
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
