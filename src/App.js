import logo from './logo.svg';
import './App.css';
import Router from './router/Router';

import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "./redux/reducers/themeSlice";
// import "./styles/global.scss"; // SCSS stilini burada əlavə edirik
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    // LocalStorage-dan dark mode vəziyyətini oxu
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    dispatch(setDarkMode(savedDarkMode));

    // `body` class-ını güncəllə
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [dispatch]);

  useEffect(() => {
    // Dark mode dəyişəndə `body` class-ını yenilə
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="app">
      <Router/>
    </div>
  );
}

export default App;