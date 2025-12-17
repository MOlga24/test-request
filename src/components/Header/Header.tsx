import React from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <div className={styles.search}>
          <SearchInput
            placeholder="Поиск заявки..."
            className="header_search"
          />
        </div>
      </div>
    </header>
  );
}
