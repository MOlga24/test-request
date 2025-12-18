import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../widgets/Header/Header";
import { Home } from "../pages/HomePage/HomePage";
import { ItemFull } from "../pages/ItemPage/ItemPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AppDispatch } from "../app/store";

import { NewRequests } from "../pages/NewRequestPage/NewRequestPage";
import { getFallbackData } from "../shared/api/constants";

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.items);

  useEffect(() => {
   dispatch(getFallbackData); 
     
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <Header />
      <Routes>
        {" "}
        <Route path="/" element={<Navigate to="/requests" replace />} />
        <Route path="/requests/new" element={<NewRequests />} />
        <Route path="/requests" element={<Home />} />
        <Route path="/requests/:id" element={<ItemFull />} />{" "}
      </Routes>
    </div>
  );
};

export default AppRoutes;
