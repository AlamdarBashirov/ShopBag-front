import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")); // JSON.parse ekleyerek düzeltildi

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
