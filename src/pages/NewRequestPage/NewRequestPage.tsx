import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../features/breadcrumps/bredcrumps";
import React, { MouseEvent as ReactMouseEvent } from "react";

import styles from "./NewRequestPage.module.css"
import { Form } from "../../shared/ui/Form/Form";
export const NewRequests = () => {
  const breadcrumbsItems = [
    { label: "Главная", link: "/requests" },
    { label: "Создание заявки" },
  ];

  const navigate = useNavigate();

  const handleContainerClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".search_results")) {
      const searchResults = document.querySelector(
        ".search_results"
      ) as HTMLElement;
      if (searchResults) {
        searchResults.style.display = "none";
      }
    }
  };
  const handleClose = () => {
    navigate("/requests");
  };

  return (
    <main className={styles.pageWrapper} onClick={handleContainerClick}>
      <Breadcrumbs items={breadcrumbsItems} />
      <div className={styles.requestWrapper}>
        <h2>Создание заявки</h2>
        <div className={styles.formContent}  onClick={(e) => e.stopPropagation()}>
          <Form onClose={handleClose} mode="newItem" />
        </div>{" "}
      </div>
    </main>
  );
};
