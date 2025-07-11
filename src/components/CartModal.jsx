import React, { useState } from "react";

const CartModal = ({ isOpen, onClose, quantities, allItems, onPlaceOrder }) => {
    if (!isOpen) return null;

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const cartItems = allItems
        .filter(item => quantities[item.name])
        .map(item => ({
            ...item,
            quantity: quantities[item.name],
            total: item.price * quantities[item.name],
        }));

    const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

    const isFormComplete = name.trim() && contact.trim() && address.trim();

    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);

        try {
            const response = await onPlaceOrder(cartItems, { name, contact, address });

            if (response?.status === 200) {
                alert("Order placed successfully!");
                setIsOrderPlaced(true);
                window.location.reload();
            } else {
                throw new Error("Failed to place order 1");
            }
        } catch (err) {
            alert("Failed to place order 2");
            console.error("Order Error:", err);
        } finally {
            setIsPlacingOrder(false);
        }
    };




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
                            <span>Total (Pay on Delivery)</span>
                            <span>₹{totalAmount}</span>
                        </div>

                        <div className="flex flex-col gap-3 mb-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="tel"
                                placeholder="Contact Number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <textarea
                                placeholder="Delivery Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>


                        <button
                            onClick={handlePlaceOrder}
                            disabled={!isFormComplete || isPlacingOrder || isOrderPlaced}
                            className={`w-full py-2 rounded-md transition-all duration-200 text-base font-semibold ${
                                isOrderPlaced
                                    ? 'bg-green-500 text-white cursor-default'
                                    : isFormComplete && !isPlacingOrder
                                        ? 'bg-black text-white hover:bg-green-400 hover:text-black'
                                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            {isOrderPlaced
                                ? 'Order Placed ✔'
                                : isPlacingOrder
                                    ? 'Placing Order...'
                                    : 'Place Order'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;