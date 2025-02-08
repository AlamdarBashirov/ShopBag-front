import axios from 'axios';
import React, { useState } from 'react';

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
    <div>
      <input type="text" placeholder="Ad" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      <input type="text" placeholder="Soyad" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Kayıt Ol</button>
    </div>
  );
};

export default Register;
