import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserforAdminThunk, getUsersAdminThunk } from "../../../../redux/reducers/adminSlice";
import Layout from "../../../../components/layout/Layout";
import style from "./AdminUsers.module.scss";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.admin);
    const loading = useSelector((state) => state.admin.loading);
    const error = useSelector((state) => state.admin.error);

    useEffect(() => {
        dispatch(getUsersAdminThunk());
        console.log(users);
    }, [dispatch]);

    const handleDelete = (userId) => {
        if (window.confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?")) {
            dispatch(deleteUserforAdminThunk(userId));
        }
    };

    return (
        <Layout>
            <div className={style.container}>
                <h2>All Users</h2>
                {loading ? <p>Yüklənir...</p> : (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <p>{user.firstname} - {user.lastname} <br />
                                {user.phone} <br />
                                {user.email} <br />
                                {user.isAdmin ? "(Admin)" : ""}
                                </p>
                                {!user.isAdmin && <button onClick={() => handleDelete(user._id)}>Sil</button>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
};

export default AdminUsers;
