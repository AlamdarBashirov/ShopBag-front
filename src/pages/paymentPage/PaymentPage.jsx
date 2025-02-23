import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntentThunk } from "../../redux/reducers/paymentSlice";
import { createOrderThunk } from "../../redux/reducers/adminSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./PaymentPage.module.scss";

// Stripe açarını yükləyirik
const stripePromise = loadStripe("pk_test_51Qs0GgRrXWB8g0vCz5OLz5STqKYdsL9VH2kzp89vrMR6Wef9Mt8icjM58nGTE1xUrwqCaP7K0weKdoXrnpr2IhC300ADPHQLGO");

// Checkout form komponenti
const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Sifariş yaratmaq funksiyası
  const handleOrder = async () => {
    console.log(basket);
    
    const orderData = {
      orderItems: basket,
      totalPrice: total,
    };

    await dispatch(createOrderThunk(orderData));
    navigate("/payment-success"); // Ödəniş uğurlu səhifəsinə yönləndir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment successfully completed! ✅");
      await handleOrder(); // Ödəniş uğurlu olduqda sifariş yarat
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className={style.amount}>
        <label htmlFor="amount">Total Amount:</label>
        <input type="text" id="amount" readOnly value={` ${total} USD`} />
      </div>
      <button className={style.payButton} disabled={!stripe || loading} style={{ marginTop: "20px" }}>
        {loading ? "Paid..." : `Pay $ ${total}`}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

const PaymentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state;
  const { payment, loading, error } = useSelector((state) => state.payment);
  const [amount, setAmount] = useState(parseFloat(total)); // Total dəyərini float kimi saxla

  useEffect(() => {
    dispatch(createPaymentIntentThunk(amount * 100)); // Ödəniş intenti yarat (cent cinsindən)
  }, [dispatch, amount]);

  const options = payment ? { clientSecret: payment } : null;

  console.log("📢 payment value:", payment); // Debug üçün

  return (
    <div className={style.section}>
      <div className={style.heading}>
        <h1>Payment Page</h1>
      </div>
      {loading && <p>Yüklənir...</p>}
      {error && <p style={{ color: "red" }}>Xəta: {error}</p>}
      {options && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm total={amount} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
