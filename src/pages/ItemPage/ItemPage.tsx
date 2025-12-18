import React, { useEffect, useState, useCallback } from "react";

import { Breadcrumbs } from "../../features/breadcrumps/bredcrumps";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { removeItem } from "../../entities/item/api/itemsSlice";

import EditItemModal from "../../widgets/EditItemModal/EditItemModal";
import styles from "./ItemPage.module.css";
import { TItem } from "../../entities/item/model/types";
import Item from "../../entities/item/ui/Item/Item";

export const ItemFull = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const items = useSelector((state: RootState) => state.items.items);

  const [currentItem, setCurrentItem] = useState(() =>
    id ? items.find((item:TItem) => item.id === id) : null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const foundItem = items.find((item:TItem) => item.id === id);
      setCurrentItem(foundItem || null);
    } else {
      setCurrentItem(null);
    }
  }, [id, items]);

  const handleDeleteItem = useCallback(() => {
    if (!currentItem) {
      console.error("Item not found for deletion");
      return;
    }

    if (window.confirm("Вы уверены, что хотите удалить заявку?")) {
      dispatch(removeItem(currentItem.id));
      navigate("/");
    }
  }, [dispatch, currentItem, navigate]);

  const handleEditItem = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  if (!currentItem && id) {
    return (
      <div className={styles.pageWrapper}>
        <div className="loading">Загрузка заявки...</div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.empty}>
          <h2>Заявка не найдена</h2>
          <p>Заявка с ID {id} не существует или была удалена.</p>
          <button onClick={() => navigate("/")} className={styles.button}>
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbsItems = [
    { label: "Главная", link: "/requests" },
    { label: `Заявка № ${currentItem.id}` },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className={styles.title}>
        <p>Заявка №{currentItem.id}</p>
      </div>
      <Item
        mode="full"
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        onNavigateHome={() => navigate("/requests")}
        item={currentItem}
      />
      <EditItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
