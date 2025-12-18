export const validateForm = (
  title: string,
  description: string,
  category: string
): { title?: string; description?: string; category?: string } => {
  const newErrors: {
    title?: string;
    description?: string;
    category?: string;
  } = {};
  const titleTrimmed = title.trim();
  if (!titleTrimmed) {
    newErrors.title = "Название обязательно для заполнения";
  } else if (titleTrimmed.length < 3) {
    newErrors.title = "Название должно содержать минимум 3 буквы";
  } else if (!/^[a-zA-Zа-яА-ЯёЁ\d\s\-_.,!?()]{3,}$/i.test(titleTrimmed)) {
    newErrors.title =
      "Название должно содержать только буквы, цифры, пробелы и основные знаки препинания";
  }

  const descriptionTrimmed = description.trim();
  if (!descriptionTrimmed) {
    newErrors.description = "Описание обязательно для заполнения";
  } else {
    const wordCount = descriptionTrimmed
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    if (wordCount < 2) {
      newErrors.description = "Описание должно содержать минимум 2 слова";
    } else if (descriptionTrimmed.length < 10) {
      newErrors.description = "Описание должно содержать минимум 10 символов";
    }
  }
   const categoryTrimmed = category.trim();
  if (!categoryTrimmed) {
    newErrors.category = "Пожалуйста, выберите категорию";
  }
  return newErrors;
};
