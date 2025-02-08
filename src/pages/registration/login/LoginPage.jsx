import axios from "axios";
import React, { useState } from "react";

const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5500/users/login",
                { email, password },
                { withCredentials: true }
            );
    
            console.log("Gelen veri:", res.data);
    
            // Backend başarısız girişlerde 'success: false' veya hata mesajı döndürüyor mu kontrol et
            if (!res.data?.user) {
                alert(res.data?.error || "Giriş başarısız, lütfen bilgilerinizi kontrol edin.");
                return;
            }
    
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("Giriş başarılı!");
    
            // Inputları temizle
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Login hatası:", err);
            console.error("Hata detayı:", err.response?.data);
    
            alert(err.response?.data?.error || "Sunucuya bağlanılamadı, lütfen tekrar deneyin.");
        }
    };
    

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Giriş Yap</button>
        </div>
    );
};

export default LoginPage;
