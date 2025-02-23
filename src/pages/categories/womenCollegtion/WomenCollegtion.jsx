import React, { useEffect, useState } from 'react';
import style from './WomenCollegtion.module.scss';
import Layout from '../../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsManCollegtion } from '../../../redux/reducers/manSlice';
import { getProductsHomeThunk, postProductsToBasketfromHomeThunk, postProductsToBasketThunk } from '../../../redux/reducers/productSlice';
import { useNavigate } from 'react-router-dom';
import { getCategoriesProductsThunk } from '../../../redux/reducers/categoriesSlice';
import WomanCard from './cards/WomanCard';

const WomenCollegtion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(getProductsHomeThunk());
    }, [dispatch]);

    const filteredData = products.filter((product) => product.category === "woman");
    const [page, setPage] = useState(1);
    const [productsPage, setProductsPage] = useState(16);

    const lastProductIndex = page * productsPage;
    const firstProductIndex = lastProductIndex - productsPage;
    const currentProducts = filteredData.slice(firstProductIndex, lastProductIndex);

    let pageNum = [];

    for (let i = 1; i <= Math.ceil(filteredData.length / productsPage); i++) {
        pageNum.push(i);
    }

    const AddBasket = (item) => {
        dispatch(postProductsToBasketfromHomeThunk(item));
    };

    const GoDetail = (item) => {
        navigate("/details", { state: { item } });
    };

    if (loading) return <div className={style.section}><h1>Yuklenir...</h1></div>;
    if (error) return <div className={style.section}><h1>Xeta Bas Verdi</h1></div>;

    return (
        <Layout>
            <div className={style.section}>
                <div className={style.container}>
                    {currentProducts && currentProducts.map(item => (
                        <WomanCard key={item._id} item={item} AddBasket={() => AddBasket(item)} GoDetail={() => GoDetail(item)} />
                    ))}
                </div>
                <div className={style.pagination}>
                    {pageNum && pageNum.map(item => (
                        <button key={item} onClick={() => setPage(item)}>{item}</button>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default WomenCollegtion;