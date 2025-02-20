import React, { useEffect, useRef } from 'react';
import style from './popularProductsSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsHomeThunk, postProductsToBasketfromHomeThunk } from '../../../../redux/reducers/productSlice';
import { toggleWishlistThunk, getProductsWishlistThunk } from '../../../../redux/reducers/wishlistSlice';
import PopularCard from './cards/PopularCard';

const PopularProductsSection = () => {
    const cardBoxRef = useRef(null);
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const wishlist = useSelector((state) => state.wishlist.wishlist); // ✅ Wishlist state
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
        dispatch(getProductsHomeThunk());
        dispatch(getProductsWishlistThunk()); // ✅ Sayfa açıldığında wishlist-i yükləyir
    }, [dispatch]);

    const AddBasket = (item) => {
        dispatch(postProductsToBasketfromHomeThunk(item));
    };

    const ToggleWishlist = (item) => {
        dispatch(toggleWishlistThunk(item));
    };

    const scrollLeft = () => {
        if (cardBoxRef.current) {
            cardBoxRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (cardBoxRef.current) {
            cardBoxRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    if (loading) return <div className={style.section}><h1>Yüklənir...</h1></div>;
    if (error) return <div className={style.section}><h1>Xəta Baş Verdi</h1></div>;

    return (
        <div className={`${style.section} ${darkMode ? style.dark : ''}`}>
            <div className={style.sectionName}>
                <h1>Populyar Məhsullar</h1>
            </div>
            <div className={style.container}>
                {products.length > 4 && (
                    <button className={style.scrollButton} onClick={scrollLeft}>{"<"}</button>
                )}
                <div className={style.cardBox} ref={cardBoxRef}>
                    {products.map((item, index) => (
                        <PopularCard 
                            key={item.id || index} 
                            item={item} 
                            AddBasket={() => AddBasket(item)} 
                            ToggleWishlist={() => ToggleWishlist(item)}  
                            isInWishlist={wishlist.some((wishItem) => wishItem._id === item._id)} // ✅ Dərhal dəyişir
                        />
                    ))}
                </div>
                {products.length > 4 && (
                    <button className={style.scrollButton} onClick={scrollRight}>{">"}</button>
                )}
            </div>
        </div>
    );
};

export default PopularProductsSection;
