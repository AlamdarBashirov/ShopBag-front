import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ManCard.module.scss";
import { toggleWishlistThunk } from "../../../../redux/reducers/wishlistSlice";

const ManCard = ({ item, AddBasket, GoDetail }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const isInWishlist = wishlist.some((wishItem) => wishItem._id === item._id);

  const handleToggleWishlist = () => {
    dispatch(toggleWishlistThunk(item));
  };

  return (
    <div className={style.card}>
      <img src={item.image} alt={item.title} />
      <p>{item.title}</p>
      <p>${item.price}</p>
      <div className={style.buttons}>
        <button onClick={AddBasket}>Add Basket</button>
        <button onClick={GoDetail}>Details</button>
        <button onClick={handleToggleWishlist} className={style.wishlistBtn}>
          {isInWishlist ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default ManCard;
