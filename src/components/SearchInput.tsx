import React, { useState, useRef, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { searchItems } from "../utils/search";

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
  const handleResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
  };
  return (
    <div className={`search_input_container ${className}`} ref={searchRef}>
      <SearchLineIcon
        className="icon_search"
        style={{ display: isFocused ? "none" : "block" }}
      />
      <input
        id="search"
        className="search"
        value={searchQuery}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />

      {showResults && searchResults.length > 0 && (
        <div className="search_results">
          {searchResults.map((item) => (
            <NavLink
              key={item.id}
              to={`/requests/${item.id}`}
              className="search_result_item"
              onClick={handleResultClick}
            >
              <div>
                <p>{item.title}</p>
                <p>{item.date} </p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
      {showResults && searchResults.length === 0 && (
        <div className="search_results">
          <p className="no_results">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
};
