import React from "react";
import styles from "./Header.module.css";
import { SearchInput } from "../../features/search/SearchInput/SearchInput";

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
