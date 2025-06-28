import React from "react";

const CartModal = ({ isOpen, onClose, quantities, allItems, onPlaceOrder }) => {
    if (!isOpen) return null;

    const cartItems = allItems
        .filter(item => quantities[item.name])
        .map(item => ({
            ...item,
            quantity: quantities[item.name],
            total: item.price * quantities[item.name],
        }));

    const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md relative">
                <button
                    className="absolute top-2 right-3 text-xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-600">Cart is empty.</p>
                ) : (
                    <>
                        <ul className="space-y-3 mb-4 max-h-[250px] overflow-y-auto">
                            {cartItems.map((item, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>₹{item.total}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold border-t pt-2 mb-4">
                            <span>Total:</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <button
                            onClick={() => onPlaceOrder(cartItems)}
                            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                            Place Order
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;
