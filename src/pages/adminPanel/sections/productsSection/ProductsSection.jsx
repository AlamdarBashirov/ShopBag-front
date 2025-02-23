    import React, { useEffect, useState } from "react";
    import style from "./ProductsSection.module.scss";
    import { useDispatch, useSelector } from "react-redux";
    import {
        addToPageFromAdminThunk,
        deleteItemFromAdminPanelThunk,
        getProductsAdminPanelThunk,
    } from "../../../../redux/reducers/adminSlice";
    import { useFormik } from "formik";
    import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../../../redux/reducers/profileSlice";

    const ProductsSection = () => {
        const dispatch = useDispatch();

        const user = useSelector((state) => state.profile.profile);
        console.log(user);
        


        const navigate = useNavigate()

        const [text, setText] = useState('')
        const [sort, setSort] = useState('asc')

        const products = useSelector((state) => state.admin.admin);
        const loading = useSelector((state) => state.admin.loading);
        const error = useSelector((state) => state.admin.error);

        const deleteProduct = (id) => {
            dispatch(deleteItemFromAdminPanelThunk(id))
        }

        const filteredData = products
            .filter(product => product.title.toLowerCase().includes(text.toLowerCase()))
            .sort((a, b) => {
                if (sort == 'asc') {
                    return a.price - b.price
                } else {
                    return b.price - a.price
                }
            })

        const formik = useFormik({
            initialValues: {
                image: "",
                title: "",
                price: "",
                category: "",
                description: "",
                size: ""
            },
            onSubmit: (values) => {
                dispatch(addToPageFromAdminThunk(values));
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            },
        });

        useEffect(() => {
            dispatch(getProductsAdminPanelThunk());
        }, []);

        useEffect(() => {
            dispatch(fetchUserProfile())
        }, [])

        if (loading) return <h1>Yuklenir</h1>;
        if (error) return <h1>Xeta bas verdi</h1>;
        if (!user.isAdmin == false) {
            return <p>knlkn</p>;
        }

        // return <h1>Admin Panelinə Xoş Gəldiniz</h1>;
        return (
            <div className={style.section}>
                <div>
                    <button onClick={() => navigate("/adminPanel/Users")}>Go Users</button>
                </div>


                <form onSubmit={formik.handleSubmit}>
                    <h1>Add New Product</h1>
                    <label htmlFor="image">Image</label>
                    <input
                        id="image"
                        name="image"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.image}
                    />
                    <label htmlFor="price">price</label>
                    <input
                        id="price"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <label htmlFor="title">TITLE</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <label htmlFor="description">Descripton</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <label htmlFor="size">Size</label>
                    <input
                        id="size"
                        name="size"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.size}
                    />
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                    />
                    <button type="submit">Submit</button>
                </form>
                <h2>All Products</h2>
                <input type="text" placeholder="search" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={() => setSort('asc')}>From little to much</button>
                <button onClick={() => setSort('desc')}>From much to little</button>
                <div className={style.container}>
                    <table style={{ width: '100%', border: '1px solid black' }}>
                        <tr style={{ border: '1px solid black' }}>
                            <th style={{ border: '1px solid black' }}>image</th>
                            <th style={{ border: '1px solid black' }}>title</th>
                            <th style={{ border: '1px solid black' }}>price</th>
                            <th style={{ border: '1px solid black' }}>əməliyyat</th>
                        </tr>

                        {filteredData &&
                            filteredData.map((item) => (
                                <tr>
                                    <td style={{ border: '1px solid black' }}>
                                        <img style={{ width: '80px' }} src={item.image} alt="" />
                                    </td>
                                    <td style={{ border: '1px solid black' }}>{item.title}</td>
                                    <td style={{ border: '1px solid black' }}>{item.price}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        <button onClick={() => deleteProduct(item._id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                    </table>
                </div>
            </div>
        );
    };

    export default ProductsSection;