import React, { useEffect, useState } from 'react'
import style from './BasketSection.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductsFromBasketThunk, getProductsBasketThunk } from '../../../redux/reducers/basketSlice'
import CardBasket from '../cardBasket/CardBasket'
import { postProductsToBasketThunk } from '../../../redux/reducers/productSlice'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from "react-spinners";


const BasketSection = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [isBuyOpen, setIsBuyOpen] = useState(false);  // State to manage buy section visibility

    const basket = useSelector((state) => state.basket.basket)
    const loading = useSelector((state) => state.basket.loading)
    const error = useSelector((state) => state.basket.error)

    const GoDetail = (item) => {
        navigate("/details", { state: { item } })
    }

    const DeleteFromBasket = (id) => {
        dispatch(deleteProductsFromBasketThunk(id))
    }

    const IncreaseCount = (item) => {
        dispatch(postProductsToBasketThunk({ _id: item._id, count: 1 }));
        setTimeout(() => {
            dispatch(getProductsBasketThunk())
        }, 800)
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500)
    };

    const DecreaseCount = (item) => {
        if (item.count > 1) {
            dispatch(postProductsToBasketThunk({ _id: item._id, count: -1 }));
            setTimeout(() => {
                dispatch(getProductsBasketThunk())
            }, 800)
            // setTimeout(() => {
            //     window.location.reload();
            // }, 500)
        }
    };

    const BuyProducts = () => {
        navigate("/payment", { state: { total } })
    }

    // const IncreaseCount = (item) => {
    //      dispatch(postProductsToBasketThunk(item))
    // }

    useEffect(() => {
        dispatch(getProductsBasketThunk())
        console.log(basket);
    }, [])
    let total = basket.length > 0 ? basket.map(item => item.price * item.count).reduce((a, b) => a + b) : 0
    let number = basket.length > 0 ? basket.map(item => item.count).reduce((a, b) => a + b) : 0


    let emptyBasket = basket.length === 0 ? <h1 style={{border:"1px solid #e6e6e6", borderRadius:"20px", padding:"15px 30px", backgroundColor:"white"}}>You have not added any products to your cart.</h1> : null

    if (loading) return <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh', width: '100%' }}><h1><ClipLoader color="#DA5826" size={70} /></h1></div>
    if (error) return <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh', width: '100%' }}><h1>Xeta Bas Verdi</h1></div>
    if (emptyBasket) {
        return <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh', width: '100%', textAlign:"center" }}>{emptyBasket}</div>
    }
    return (
        <div className={style.section}>
            <div className={style.container}>
                <div className={style.productsBox}>
                    {basket && basket.map(item => <CardBasket item={item} DeleteFromBasket={() => DeleteFromBasket(item._id)} IncreaseCount={() => IncreaseCount(item)} DecreaseCount={() => DecreaseCount(item)} GoDetail={() => GoDetail(item)} />)}
                </div>
                <div className={`${style.buy} ${isBuyOpen ? style.open : ''}`}>
                    <h1>Total Orders</h1>
                    <p>Total Price: $ {total}</p>
                    <p>Total Product: {number}</p>
                    <button onClick={BuyProducts} className={style.orderBtn}>Buy</button>
                    <button
                        className={`${style.close} ${style.buyButton} ${isBuyOpen ? style.open : ''}`}
                        onClick={() => setIsBuyOpen(false)} // Close the Buy section
                    >
                        Close
                    </button>
                </div>
            </div>
            <div className={style.buyBox}>
                <button
                    className={style.buyButton}
                    onClick={() => setIsBuyOpen(true)} // Open the Buy section
                >
                    Total Orders
                </button>
            </div>
        </div>

    )
}

export default BasketSection