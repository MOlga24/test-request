import Items from "../../components/Items/Items";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { ScrollToTop } from "../../components/ScrollToTop";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css"
export const Home = () => {
  const navigate = useNavigate();
  const handlePlusClick = () => {
    navigate("/requests/new");
  };
  const items = useSelector((state: RootState) => state.items.items);
  const FiPlusIcon = FiPlus as React.ElementType;
  return (
    <>
      <div className={styles.container}>
        <h2>Список заявок</h2>
        <button className={`${styles.addRequest} ${styles.button}`} onClick={handlePlusClick}>
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
