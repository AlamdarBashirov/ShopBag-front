import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getOrdersAdminThunk } from "../../../../redux/reducers/adminSlice";

const Order = () => {
  const dispatch = useDispatch();
  const  orders = useSelector((state) => state.admin.admin);
  const  loading = useSelector((state) => state.admin.loading);
  const  error = useSelector((state) => state.admin.error);

  useEffect(() => {
    dispatch(getOrdersAdminThunk());
  }, [dispatch]);

  // 🔹 Sifarişi təsdiqləyən funksiya
  const approveOrder = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}/approve`, {}, { withCredentials: true });
      dispatch(getOrdersAdminThunk()); // Sifarişlər yenilənsin
    } catch (error) {
      console.error("Sifariş təsdiqlənərkən xəta:", error);
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta: {error}</p>;

  return (
    <div>
      <h2>Bütün Sifarişlər</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>İstifadəçi</th>
            <th>Məbləğ</th>
            <th>Status</th>
            <th>Təsdiqlə</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.email}</td>
              <td>{order.totalPrice} AZN</td>
              <td>{order.isDelivered ? "Təsdiqləndi" : "Gözləyir"}</td>
              <td>
                {!order.isDelivered && <button onClick={() => approveOrder(order._id)}>✅ Təsdiqlə</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
