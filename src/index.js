import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Elements } from '@stripe/react-stripe-js';
import PaymentPage from './pages/paymentPage/PaymentPage';
import { loadStripe } from '@stripe/stripe-js';
// import reportWebVitals from './reportWebVitals';

const stripePromise = loadStripe("pk_test_51Qs0GgRrXWB8g0vCz5OLz5STqKYdsL9VH2kzp89vrMR6Wef9Mt8icjM58nGTE1xUrwqCaP7K0weKdoXrnpr2IhC300ADPHQLGO")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
