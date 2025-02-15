import React, { useEffect } from 'react'
import style from './BasketSection.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductsFromBasketThunk, getProductsBasketThunk } from '../../../redux/reducers/basketSlice'
import CardBasket from '../cardBasket/CardBasket'
import { postProductsToBasketThunk } from '../../../redux/reducers/productSlice'
import { useNavigate } from 'react-router-dom'

const BasketSection = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const basket = useSelector((state) => state.basket.basket)
    const loading = useSelector((state) => state.basket.loading)
    const error = useSelector((state) => state.basket.error)

    const GoDetail = (item) => {
        navigate("/details", {state:{item}})
    }
    
    const DeleteFromBasket = (id) => {
        dispatch(deleteProductsFromBasketThunk(id))
    }

    const IncreaseCount = (item) => {
        dispatch(postProductsToBasketThunk({ _id: item._id, count: 1 }));
        setTimeout(() => {
            window.location.reload();
        }, 500)
    };
    
    const DecreaseCount = (item) => {
        if (item.count > 1) {
            dispatch(postProductsToBasketThunk({ _id: item._id, count: -1 }));
        }
    };
    
    // const IncreaseCount = (item) => {
    //      dispatch(postProductsToBasketThunk(item))
    // }
    
    useEffect(() => {
        dispatch(getProductsBasketThunk())
        console.log(basket);
    }, [])

    if (loading) return <div className={style.section}><h1>Yuklenir...</h1></div>
    if (error) return <div className={style.section}><h1>Xeta Bas Verdi</h1></div>
    return (
        <div className={style.section}>
            <div className={style.container}>
                <div className={style.productsBox}>
                    {basket && basket.map(item => <CardBasket item={item} DeleteFromBasket={() => DeleteFromBasket(item._id)} IncreaseCount={() => IncreaseCount(item)} DecreaseCount={() => DecreaseCount(item)} GoDetail={() => GoDetail(item)}  />)}
                </div>
                <div className={style.buy}>
                    <h1>bu hisse trendyolun basketinden goturulub</h1>
                </div>
            </div>
        </div>
    )
}

export default BasketSection