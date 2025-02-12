import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './LoginPage.module.scss'


const LoginPage = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5500/users/login",
                { email, password },
                { withCredentials: true }
            );

            console.log("Gelen veri:", res.data);
            console.log("status", res.status);

            if (res.status === 200 && res.data._id) {
                setUser(res.data);  // Local state güncelleniyor
                localStorage.setItem("user", JSON.stringify(res.data));
                alert("Giriş başarılı!");

                //tokeni yadda saxla
                localStorage.setItem("token", res.data.token);


                navigate("/")
            } else {
                throw new Error("Yanıt beklenmeyen formatta");
            }
        } catch (err) {
            console.error("Login hatası:", err);
            console.error("Hata detayı:", err.response?.data);
            alert(err.response?.data?.error || "Sunucuya bağlanılamadı, lütfen tekrar deneyin.");
        }
    };

    return (
        <div className={style.section}>
            <div className={style.container}>
                <div className={style.loginForm}>
                    <div className={style.loginText}>
                        <h1>Login to Your Account</h1>
                    </div>
                    <div className={style.inputs}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={handleLogin} className={style.logButton} >Giriş Yap</button>
                    </div>
                </div>
                <div className={style.toRegister}>
                    <h1>New Here</h1>
                    <h5>Sign Up and discover lots of new products</h5>
                    <button className={style.toRegButton} onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;
