import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntentThunk } from "../../redux/reducers/paymentSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Stripe açarını yükləyirik
const stripePromise = loadStripe("pk_test_51Qs0GgRrXWB8g0vCz5OLz5STqKYdsL9VH2kzp89vrMR6Wef9Mt8icjM58nGTE1xUrwqCaP7K0weKdoXrnpr2IhC300ADPHQLGO");

// Checkout form komponenti
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

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
      setMessage("Ödəniş uğurla tamamlandı! ✅");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || loading} style={{ marginTop: "20px" }}>
        {loading ? "Ödəniş edilir..." : "Ödəniş et"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { payment, loading, error } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(createPaymentIntentThunk(1000)); // 10 USD üçün intent yaradırıq
  }, [dispatch]);

  const options = payment ? { clientSecret: payment } : null;

  console.log("📢 payment dəyəri:", payment);  // 🔍 Debug
  return (
    <div>
      <h2>Stripe Ödəniş Səhifəsi</h2>
      {loading && <p>Yüklənir...</p>}
      {error && <p style={{ color: "red" }}>Xəta: {error}</p>}
      {options && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
