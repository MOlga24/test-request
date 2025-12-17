import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../services/store";
import { TItem } from "../../utils/types";
import { addItem, updateItem } from "../../services/slices/itemsSlice";
import { categories, generateDateBasedId } from "../../constants/constants";
import { validateForm } from "../../utils/validation";
import styles from "./Form.module.css";
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
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    category: false,
  });

  const dispatch = useDispatch<AppDispatch>();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setErrors({});
    setTouched({
      title: false,
      description: false,
      category: false,
    });
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
  useEffect(() => {
    if (isEditMode && existingItem) {
      setTitle(existingItem.title || "");
      setDescription(existingItem.description || "");
      setCategory(existingItem.category || "");
    } else {
      resetForm();
    }
  }, [existingItem, isEditMode]);

  useEffect(() => {
    const validationErrors = validateForm(title, description, category);
    setErrors(validationErrors);
  }, [title, description, category]);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
  };
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
  const showError = (field: keyof typeof errors) => {
    return touched[field] && errors[field];
  };
  return (
    <form onSubmit={handleSubmit} className="add_item_form">
      <div
        className={`${styles.formGroup} ${
          showError("title") ? styles.hasError : ""
        }`}
      >
        <label className={styles.title}> Название заявки*</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={() => handleBlur("title")}
          className={`${styles.inputText} ${
            showError("title") ? styles.inputError : ""
          }`}
          placeholder="Введите название (минимум 3 буквы)"
        />
        {showError("title") && (
          <div className={styles.errorContainer}>
            <span className={styles.errorMessage}>{errors.title}</span>
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.title}>Описание*</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          rows={3}
          onBlur={() => handleBlur("description")}
          className={`${styles.inputText} ${
            showError("description") ? styles.inputError : ""
          }`}
          placeholder="Введите описание (минимум 2 слова)"
        />
        {showError("description") && (
          <div className={styles.errorContainer}>
            <span className={styles.errorMessage}>{errors.description}</span>
          </div>
        )}
      </div>
      <div
        className={`${styles.formGroup} ${
          showError("category") ? styles.hasError : ""
        }`}
      >
        <label className={styles.title}>Категория</label>

        <select
          value={category}
          onChange={handleCategoryChange}
          onBlur={() => handleBlur("category")}
          className={`${styles.selectText} ${
            showError("category") ? styles.inputError : ""
          }`}
        >
          <option value="">Выберите из списка</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {showError("category") && (
          <div className={styles.errorContainer}>
            <span className={styles.errorMessage}>{errors.category}</span>
          </div>
        )}
      </div>
      <div className={styles.formActions}>
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
