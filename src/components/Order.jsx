import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Order = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        items: "",
    });

    const [submitted, setSubmitted] = useState(false);

    useGSAP(() => {
        gsap.fromTo(
            ".order-title",
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out" }
        );

        gsap.fromTo(
            ".order-form div",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                },
            }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // You can replace this with Axios or Fetch POST request
            const res = await fetch("http://localhost:5000/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", phone: "", address: "", items: "" });
            } else {
                alert("Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            alert("Server Error");
        }
    };

    return (
        <section id="order" className="min-h-screen py-20 px-5 md:px-20 bg-black text-white">
            <h2 className="order-title text-4xl md:text-6xl font-bold text-center mb-10">
                Place Your Order
            </h2>

            <form
                onSubmit={handleSubmit}
                ref={formRef}
                className="order-form max-w-2xl mx-auto space-y-6"
            >
                <div>
                    <label htmlFor="name" className="block text-lg mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-lg mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-lg mb-1">
                        Delivery Address
                    </label>
                    <textarea
                        name="address"
                        rows="3"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="items" className="block text-lg mb-1">
                        Your Order (Cocktail / Mocktail Names)
                    </label>
                    <textarea
                        name="items"
                        rows="2"
                        required
                        value={formData.items}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300"
                    >
                        Submit Order
                    </button>
                </div>

                {submitted && (
                    <p className="text-green-400 text-center font-semibold">
                        Order submitted successfully!
                    </p>
                )}
            </form>
        </section>
    );
};

export default Order;
