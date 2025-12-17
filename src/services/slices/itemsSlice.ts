import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { TItem } from "../../utils/types";
import { getFallbackData } from "../../constants/constants";

export interface ItemsListState {
  items: TItem[];
  isLoading: boolean;
  error: string | undefined;
}
const loadItemsFromStorage = (): TItem[] => {
  try {
    const saved = localStorage.getItem("requests_items");
    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    return getFallbackData();
  } catch {
    return getFallbackData();
  }
};
const saveItemsToStorage = (items: TItem[]) => {
  try {
    localStorage.setItem("requests_items", JSON.stringify(items));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
};
export const initialState: ItemsListState = {
  items: loadItemsFromStorage(),
  isLoading: false,
  error: "",
};

const selectItems = (state: ItemsListState) => state.items;
const selectIsLoading = (state: ItemsListState) => state.isLoading;

export const selectIsLoadingState = createSelector(
  [selectIsLoading],
  (isLoading) => isLoading
);

export const selectAllItems = createSelector([selectItems], (items) => items);

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TItem>) => {
      state.items.unshift(action.payload);
      saveItemsToStorage(state.items);
    },
    updateItem: (state, action: PayloadAction<TItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        saveItemsToStorage(state.items);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      saveItemsToStorage(state.items);
    },
  },
  selectors: {
    getCategoriesSelector: selectItems,
    isLoadingSelector: selectIsLoading,
  },
});

export const { addItem, removeItem, updateItem } = itemsSlice.actions;
export const { getCategoriesSelector, isLoadingSelector } =
  itemsSlice.selectors;
export default itemsSlice.reducer;
