import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./PaymentSuccess.module.scss";
import Lottie from "lottie-react";
import successAnimation from "../../../components/assets/animations/completeAnimation.json";

const PaymentSuccesPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={style.section}>
      <Lottie
        animationData={successAnimation} loop={true} style={{ width: 300, height: 300 }}/>
      <h1>Payment successfully completed!</h1>
      <button className={style.homeButton} onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccesPage;