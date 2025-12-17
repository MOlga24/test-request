import { store, rootReducer } from "../services/store";
export type AppDispatch = typeof store.dispatch;

export type TItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  fulldescription?: string;
};

export const enum RequestStatus {
  Idle = "Idle",
  Loading = "Loading",
  Success = "Success",
  Failed = "Failed",
}
