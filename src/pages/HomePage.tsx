import Items from "../components/Items";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { ScrollToTop } from "../components/ScrollToTop";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const handlePlusClick = () => {
    navigate("/requests/new");
  };
  const items = useSelector((state: RootState) => state.items.items);
  const FiPlusIcon = FiPlus as React.ElementType;
  return (
    <>
      <div className="container_page">
        <h2 className="title">Список заявок</h2>
        <button className="button add_request" onClick={handlePlusClick}>
          <p>Создать заявку</p>
          <FiPlusIcon
            className="icon_plus"
            onClick={handlePlusClick}
            style={{ cursor: "pointer" }}
          />
        </button>
        <Items items={items} />
        <ScrollToTop />
      </div>{" "}
    </>
  );
};
