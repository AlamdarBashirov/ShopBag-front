import React, { useEffect } from "react";
import style from "./ProfilePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountThunk, fetchUserProfile, logOutThunk } from "../../redux/reducers/profileSlice";
import { toggleDarkMode } from "../../redux/reducers/themeSlice";
import ProfileInfoCard from "./profileInfoCard/ProfileInfoCard";
import Layout from "../../components/layout/Layout";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const infos = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    dispatch(fetchUserProfile());

    // Sayt açılarkən Dark Mode vəziyyətini oxu
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme === "true") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [dispatch]);

  const logOut = () => {
    dispatch(logOutThunk());
  };

  const deleteAccount = (id) => {
    dispatch(deleteAccountThunk(id));
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
    const newTheme = !darkMode ? "dark" : "";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("darkMode", !darkMode); // Dark mode vəziyyətini yadda saxla
  };

  if (loading) return <h1>Yüklenir...</h1>;
  if (error) return <h1>Hata: {error}</h1>;
  if (!infos) return <h1>Kullanıcı bilgisi bulunamadı.</h1>;

  return (
    <Layout>
      <div className={`${style.section} ${darkMode ? style.dark : ""}`}>
        <div className={style.container}>
          <div className={style.profile}>
            {infos.map(item => (
              <ProfileInfoCard
                key={item._id}
                item={item}
                logOut={logOut}
                deleteAccount={() => deleteAccount(item._id)}
              />
            ))}
            <button onClick={handleDarkModeToggle}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className={style.orders}>
            sifarislerin
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
