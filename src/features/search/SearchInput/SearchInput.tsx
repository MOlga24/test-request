import React, { useState, useRef, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./SearchInput.module.css";
import { RootState } from "../../../app/store";
import { searchItems } from "../lib/search";
interface SearchItem {
  id: string;
  title: string;
  date: string;
}
interface SearchInputProps {
  className?: string;
  placeholder?: string;
}
export const SearchInput: React.FC<SearchInputProps> = ({
  className = "",
  placeholder = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.items.items);
  const searchRef = useRef<HTMLDivElement>(null);
  const SearchLineIcon = RiSearchLine as React.ElementType;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const results = searchItems(query, items);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
    if (searchQuery.length > 2 && searchResults.length > 0) {
      setShowResults(true);
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleResultClick = (item: SearchItem) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/requests/${item.id}`);
  };
  return (
    <div className={`${styles.container} ${className}`} ref={searchRef}>
      <SearchLineIcon
        className={styles.icon}
        style={{ display: isFocused ? "none" : "block" }}
      />
      <input
        id="search"
        className={styles.search}
        value={searchQuery}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />

      {showResults && searchResults.length > 0 && (
        <div className={styles.searchResults}>
          {searchResults.map((item) => (
            <div
              key={item.id}
              className={styles.searchItem}
              onClick={() => handleResultClick(item)}
            >
              <div>
                <p>{item.title}</p>
                <p>{item.date} </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showResults && searchResults.length === 0 && (
        <div className={styles.searchResults}>
          <p className={styles.noResults}>Ничего не найдено</p>
        </div>
      )}
    </div>
  );
};
