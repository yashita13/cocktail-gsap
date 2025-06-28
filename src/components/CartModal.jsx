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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md relative shadow-xl">
                <button
                    className="absolute top-2 right-3 text-3xl font-bold text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-5 text-center text-black">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-600">Cart is empty.</p>
                ) : (
                    <>
                        <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1 text-base">
                            {cartItems.map((item, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>₹{item.total}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold border-t pt-2 mb-4">
                            <span>Total</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <button
                            onClick={() => onPlaceOrder(cartItems)}
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-green-400 hover:text-black transition-all duration-200 text-base font-semibold"
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
