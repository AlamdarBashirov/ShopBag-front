import React from 'react';

const PopularCard = ({ item, AddBasket, ToggleWishlist, isInWishlist }) => {
  return (
    <div className="popular-card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <h3>$ {item.price}</h3>
      <button onClick={AddBasket}>Add to Basket</button>
      <button onClick={() => ToggleWishlist(item)}>
        {isInWishlist ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default PopularCard;
