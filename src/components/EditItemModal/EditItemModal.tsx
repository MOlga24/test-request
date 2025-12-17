import React from "react";
import { FiX } from "react-icons/fi";
import { Form } from "../Form/Form";
import styles from "./EditItemModal.module.css";
interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose }) => {
  const FiXIcon = FiX as React.ElementType;
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Редактирование заявки</h3>
          <FiXIcon className={styles.close} onClick={handleClose} />
        </div>
        <Form onClose={onClose} mode="isEdit" />
      </div>
    </div>
  );
};

export default EditItemModal;
