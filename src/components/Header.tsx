import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { FiHeart } from "react-icons/fi";
import { searchItems } from "../utils/search";
import { SearchInput } from "./SearchInput";




export default function Header() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  const items = useSelector((state: RootState) => state.items.items);
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  const SearchLineIcon = RiSearchLine as React.ElementType;




  return (
    <header className="header">
      <div className="main_menu">
        <div className="sub_menu_search">
          
       
    <SearchInput
            placeholder="Поиск заявки..."
            className="header_search"
          />
         
        </div>
      </div>
  
    </header>
  );
}
