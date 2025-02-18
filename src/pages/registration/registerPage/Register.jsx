import axios from 'axios';
import React, { useState } from 'react';
import style from './RegisterPage.module.scss';

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Hata mesajları için state
  const [successMessage, setSuccessMessage] = useState(null); // Başarı mesajı için state

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d+\)?[-.\s]?\d+[-.\s]?\d+[-.\s]?\d+$/;

  const handleRegister = async () => {
    if (!firstname || !lastname || !email || !phone || !password) {
      setError("Lütfen tüm alanları doldurun.");
      setSuccessMessage(null); // Hata olduğunda başarı mesajını sıfırla
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Geçerli bir e-posta adresi girin.");
      setSuccessMessage(null);
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Geçerli bir telefon numarası girin.");
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5500/users/register",
        { firstname, lastname, email, phone, password },
        { withCredentials: true }
      );
      setSuccessMessage("Kayıt başarılı! Giriş yapabilirsiniz."); // Başarı mesajını set et
      setError(null); // Hata varsa sıfırla
      setTimeout(() => window.location.href = '/login', 2000); // 2 saniye sonra login sayfasına yönlendir
    } catch (err) {
      setError(err.response?.data?.error || "Kayıt başarısız.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className={style.section}>
      <div className={style.container}>
        <div className={style.regIntro}>
          <h1>Welcome</h1>
          <h4>Your dream products are just one click away</h4>
        </div>
        <div className={style.regForm}>
          <h1>Create an Account</h1>
          {error && <div className={style.errorMessage}>{error}</div>} {/* Hata mesajı */}
          {successMessage && <div className={style.successMessage}>{successMessage}</div>} {/* Başarı mesajı */}
          <input
            type="text"
            placeholder="Ad"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Soyad"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister} className={style.regButton}>
            Sign Up
          </button>
          <span>
            Do You Have an Account ? <a href="/login">Log in</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
