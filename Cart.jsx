import React from "react";

function Cart({ cartItems, removeFromCart }) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  };

  return (
    <div className="p-5 container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-4 p-4 border rounded">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>Color: {item.color}</p>
                <p>Amount: {item.amount}</p>
                <p>Price: ${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right font-bold text-xl">
            Total: ${getTotalPrice()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
