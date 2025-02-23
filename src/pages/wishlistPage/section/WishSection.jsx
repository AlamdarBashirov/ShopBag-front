import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductsFromWishlistThunk, getProductsWishlistThunk } from '../../../redux/reducers/wishlistSlice'
import { ClipLoader } from "react-spinners";
import style from './WishSection.module.scss'
import { postProductsToBasketfromHomeThunk } from '../../../redux/reducers/productSlice';
import WishCard from '../wishCard/WishCard';

const WishSection = () => {

    const dispatch = useDispatch()
    const userId = useSelector((state) => state.profile.userId); // İstifadəçi ID-si alınır
    const products = useSelector((state) => state.wishlist.wishlist)
    const loading = useSelector((state) => state.wishlist.loading)
    const error = useSelector((state) => state.wishlist.error)

    useEffect(() => {
        if (userId && products === undefined) { // `products` hələ fetch olunmayıbsa, request göndər
            dispatch(getProductsWishlistThunk(userId));
        }
    }, [dispatch]);
    

    const AddBasket = (item) => {
        dispatch(postProductsToBasketfromHomeThunk(item))
    }

    const DeleteWishlist = (id) => {
        dispatch(deleteProductsFromWishlistThunk(id))
    }


    // let emptyWishlist = products.length === 0 ? <h1 className={style.emptyWish} style={{ border: "1px solid #e6e6e6", borderRadius: "20px", padding: "15px 30px", backgroundColor: "white" }}>You have not added any products to your cart.</h1> : null

    let emptyWishlist = (!products || products.length === 0) ?
        <h1 className={style.emptyWish} style={{ border: "1px solid #e6e6e6", borderRadius: "20px", padding: "15px 30px", backgroundColor: "white" }}>
            You have not added any products to your cart.
        </h1>
        : null;


    if (loading) return <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh', width: '100%' }}><h1><ClipLoader color="#DA5826" size={70} /></h1></div>
    if (error) return <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh', width: '100%' }}><h1>Xeta Bas Verdi</h1></div>
    if (emptyWishlist) {
        return <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh', width: '100%', textAlign: "center" }}>{emptyWishlist}</div>
    }

    return (
        <div className={style.section}>
            <div className={style.container}>
                {products?.length > 0 && products.map(item =>
                    <WishCard key={item?._id} item={item} AddBasket={() => AddBasket(item)} DeleteWishlist={() => DeleteWishlist(item?._id)} />
                )}
            </div>
        </div>
    )
}

export default WishSection
