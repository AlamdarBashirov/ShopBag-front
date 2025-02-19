import React, { useEffect, useState } from 'react';
import style from './BasketSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductsFromBasketThunk, getProductsBasketThunk } from '../../../redux/reducers/basketSlice';
import CardBasket from '../cardBasket/CardBasket';
import { postProductsToBasketThunk } from '../../../redux/reducers/productSlice';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";

const BasketSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isBuyOpen, setIsBuyOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    const basket = useSelector((state) => state.basket.basket);
    const loading = useSelector((state) => state.basket.loading);
    const error = useSelector((state) => state.basket.error);

    useEffect(() => {
        dispatch(getProductsBasketThunk());
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
    };

    const GoDetail = (item) => navigate("/details", { state: { item } });

    const DeleteFromBasket = (id) => dispatch(deleteProductsFromBasketThunk(id));

    const IncreaseCount = (item) => {
        dispatch(postProductsToBasketThunk({ _id: item._id, count: 1 }));
        setTimeout(() => dispatch(getProductsBasketThunk()), 800);
    };

    const DecreaseCount = (item) => {
        if (item.count > 1) {
            dispatch(postProductsToBasketThunk({ _id: item._id, count: -1 }));
            setTimeout(() => dispatch(getProductsBasketThunk()), 800);
        }
    };

    const BuyProducts = () => navigate("/payment", { state: { total } });

    let total = basket.length > 0 ? basket.map(item => item.price * item.count).reduce((a, b) => a + b) : 0;
    let number = basket.length > 0 ? basket.map(item => item.count).reduce((a, b) => a + b) : 0;

    if (loading) return <div className={style.loader}><ClipLoader color="#DA5826" size={70} /></div>;
    if (error) return <div className={style.error}><h1>Xeta Bas Verdi</h1></div>;
    if (basket.length === 0) return <div className={style.emptyBasket}><h1>You have not added any products to your cart.</h1></div>;

    return (
        <div className={`${style.section} ${isDarkMode ? style.dark : ''}`}>
            <div className={style.container}>
                <div className={style.productsBox}>
                    {basket.map(item => (
                        <CardBasket 
                            key={item._id} 
                            item={item} 
                            DeleteFromBasket={() => DeleteFromBasket(item._id)} 
                            IncreaseCount={() => IncreaseCount(item)} 
                            DecreaseCount={() => DecreaseCount(item)} 
                            GoDetail={() => GoDetail(item)} 
                        />
                    ))}
                </div>
                <div className={`${style.buy} ${isBuyOpen ? style.open : ''}`}>
                    <h1>Total Orders</h1>
                    <p>Total Price: $ {total}</p>
                    <p>Total Product: {number}</p>
                    <button onClick={BuyProducts} className={style.orderBtn}>Buy</button>
                    <button className={style.close} onClick={() => setIsBuyOpen(false)}>Close</button>
                </div>
            </div>
            <div className={style.buyBox}>
                <button className={style.buyButton} onClick={() => setIsBuyOpen(true)}>Total Orders</button>
                <button className={style.darkModeBtn} onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </div>
    );
};

export default BasketSection;
