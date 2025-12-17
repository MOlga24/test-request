import React from "react";
import { FiX } from "react-icons/fi";
import { Form } from "./Form";

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
    <div className="modal_overlay" onClick={handleClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h3>Редактирование заявки</h3>
          <FiXIcon className="close_icon" onClick={handleClose} />
        </div>
        <Form onClose={onClose} mode="isEdit" />
      </div>
    </div>
  );
};

export default EditItemModal;
