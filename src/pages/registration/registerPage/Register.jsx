import axios from 'axios';
import React, { useState } from 'react';
import style from './RegisterPage.module.scss'

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5500/users/register",
        { firstname, lastname, email, phone, password },
        { withCredentials: true }
      );
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    } catch (err) {
      alert(err.response?.data?.error || "Kayıt başarısız");
    }
  };

  return (
    <div className={style.section}>
      <div className={style.container}>
        <div className={style.regIntro}>
          <h1>welcome</h1>
        </div>
        <div className={style.regForm}>
          <h1>Create an Account</h1>
          <input type="text" placeholder="Ad" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          <input type="text" placeholder="Soyad" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister} className={style.regButton}>Qeydiyyatdan keç</button>
          <span>Do You Have an Account <a href="/login">Log in</a></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
