import { useNavigate } from "react-router-dom";

export const ShowNothing = () => {
  const navigate = useNavigate();
  return (
    
      <div className="empty">
   
        <h5 className="regular">
          Вы можете найти интересующие вас заявки на главной странице
        </h5>
        <button className="button" onClick={() => navigate("/requests")}>
          На главную
        </button>
      </div>
   
  );
};