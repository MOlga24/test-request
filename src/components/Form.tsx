import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../services/store";
import { TItem } from "../utils/types";
import { addItem, updateItem } from "../services/slices/itemsSlice";
import { categories, generateDateBasedId } from "../constants/constants";
import { validateForm } from "../utils/validation";
interface FormProps {
  mode: "isEdit" | "newItem";
  onClose?: () => void;
}
export const Form = ({ onClose, mode }: FormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const items = useSelector((state: RootState) => state.items.items);
  const existingItem =
    mode === "isEdit" && id ? items.find((item) => item.id === id) : null;
  const isEditMode = mode === "isEdit" && !!existingItem;
  useEffect(() => {
    if (isEditMode && existingItem) {
      setTitle(existingItem.title || "");
      setDescription(existingItem.description || "");
      setCategory(existingItem.category || "");
    } else {
      resetForm();
    }
  }, [existingItem, isEditMode]);
  const dispatch = useDispatch<AppDispatch>();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setErrors({});
  };
  const handleClose = () => {
    resetForm();
    if (onClose) {
      onClose();
    } else {
      navigate("/requests");
    }
  };

  const [title, setTitle] = useState(existingItem?.title || "");
  const [description, setDescription] = useState(
    existingItem?.description || ""
  );
  const [category, setCategory] = useState(existingItem?.category || "");

  const [errors, setErrors] = useState<{
    title?: string;
    category?: string;
    description?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(title, description, category);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== undefined
    );
    if (hasErrors) {
      return;
    }
    if (isEditMode && existingItem) {
      const updatedItem: TItem = {
        id: id!,
        title: title.trim(),
        category: category,
        description: description.trim(),
        date: existingItem.date, // Сохраняем оригинальную дату
        fulldescription: description.trim(),
      };
      dispatch(updateItem(updatedItem));
    } else {
      const newItem: TItem = {
        id: generateDateBasedId(),
        title: title.trim(),
        category: category,
        description: description.trim(),
        date: new Date().toLocaleDateString("ru-RU"),
        fulldescription: description.trim(),
      };
      dispatch(addItem(newItem));
    }

    resetForm();

    if (onClose) {
      onClose();
    } else {
      navigate("/requests");
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors({ ...errors, title: undefined });
    }
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    if (errors.category) {
      setErrors({ ...errors, category: undefined });
    }
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors({ ...errors, description: undefined });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add_item_form">
      <div className="form_group">
        <label>Название заявки*</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
          className={errors.title ? "error" : ""}
          placeholder="Введите название (минимум 3 буквы)"
        />
        {errors.title && <span className="error_message">{errors.title}</span>}
      </div>

      <div className="form_group">
        <label>Описание*</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          rows={3}
          required
          className={errors.description ? "error" : ""}
          placeholder="Введите описание (минимум 2 слова)"
        />
        {errors.description && (
          <span className="error_message">{errors.description}</span>
        )}
      </div>
      <div className="form_group">
        <label>Категория</label>

        <select
          value={category}
          onChange={handleCategoryChange}
          className={errors.category ? "error" : ""}
          required
        >
          <option value="">Выберите из списка</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error_message">{errors.category}</span>
        )}
      </div>
      <div className="form_actions">
        <button type="button" onClick={handleClose} className="cancel_btn">
          Отмена
        </button>
        <button type="submit" className="submit_btn">
          Сохранить
        </button>
      </div>
    </form>
  );
};
