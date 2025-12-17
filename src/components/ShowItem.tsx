import React, { useState, useRef, useCallback } from "react";
import { FiTrash2, FiEdit2, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "../services/store";
import { TItem } from "../utils/types";
import { removeItem } from "../services/slices/itemsSlice";
import EditItemModal from "./EditItemModal";
export interface ShowItemProps {
  item: TItem;
}
const FiEditIcon = FiEdit2 as React.ElementType;
const FiTrashIcon = FiTrash2 as React.ElementType;
const FiHomeIcon = FiHome as React.ElementType;

const ShowItem = React.memo(({ item }: ShowItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEditItem = () => {
    setIsModalOpen(true);
  };
  const handleDeleteItem = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (window.confirm("Вы уверены, что хотите удалить заявку?")) {
        dispatch(removeItem(item.id));
        navigate("/");
      }
    },
    [dispatch, item.id, navigate]
  );

  if (!item) {
    return (
      <div className="item-not-found">
        <h2>Заявки не найдены</h2>
        <p>Попробуйте вернуться на главную страницу</p>
        <Link to="/">На главную</Link>
      </div>
    );
  }

  return (
    <>
      <div className="full_item">
        <div className="full_item_descriprion">
          <div className="full_item_description">
            <p className="full_item_sub_title">Название</p>
            <p className="title">{item.title}</p>
            <p className="full_item_sub_title">Дата создания заявки</p>
            <p className="full_item_date">{item.date}</p>
            <p className="full_item_sub_title">Категория заявки</p>
            <p className="full_item_description">{item.category}</p>
            <p className="full_item_sub_title">Описание заявки</p>
            <p className="full_item_description">{item.description}</p>
          </div>
        </div>{" "}
        <div className="menu">
          <button className="delete_request button " onClick={handleDeleteItem}>
            <p>Удалить заявку</p>
            <FiTrashIcon
              onClick={handleDeleteItem}
              stroke="#e0d9d9ff"
              className="icon"
            />
          </button>

          <button className="edit_request button " onClick={handleEditItem}>
            <p>Редактировать заявку</p>
            <FiEditIcon
              onClick={handleEditItem}
              stroke="#e0d9d9ff"
              className="icon"
            />
          </button>

          <button
            className="home  button"
            onClick={() => navigate("/requests")}
          >
            <p> Вернуться на главную </p>{" "}
            <FiHomeIcon stroke="#e0d9d9ff" className="icon" />
          </button>
        </div>
      </div>

      <EditItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
});

export default ShowItem;
