import { cocktailLists, mockTailLists } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

const Cocktails = ({ quantities, setQuantities }) => {

    const updateQuantity = (name, delta) => {
        setQuantities((prev) => {
            const current = prev[name] || 0;
            const newCount = Math.max(0, current + delta);
            return { ...prev, [name]: newCount };
        });
    };

    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#cocktails",
                start: "top 30%",
                end: "bottom 80%",
                scrub: true,
            },
        });

        parallaxTimeline
            .from("#c-left-leaf", {
                x: -100,
                y: 100,
            })
            .from("#c-right-leaf", {
                x: 100,
                y: 100,
            });
    });

    const renderListItem = ({ name, country, detail, price }) => (
        <li
            key={name}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-white/20 gap-3 w-full"
        >
            <div className="flex-1">
                <h3>{name}</h3>
                <p className="text-sm text-white/80">
                    {country} | {detail}
                </p>
            </div>

            <div className="w-full flex justify-between items-center sm:w-auto sm:justify-normal sm:gap-8">
                <span className="text-white text-md whitespace-nowrap">₹{price}</span>
                <span>  </span>

                <div className="flex items-center gap-2 ml-auto sm:ml-0">
                    <button
                        onClick={() => updateQuantity(name, -1)}
                        className="bg-white text-black w-6 h-6 rounded-full text-sm font-bold flex items-center justify-center"
                    >
                        -
                    </button>
                    <span className="w-5 text-center">{quantities[name] || 0}</span>
                    <button
                        onClick={() => updateQuantity(name, 1)}
                        className="bg-white text-black w-6 h-6 rounded-full text-sm font-bold flex items-center justify-center"
                    >
                        +
                    </button>
                </div>
            </div>
        </li>
    );

    return (
        <section id="cocktails" className="noisy">
            <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
            <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf" />

            <div className="list space-y-10">
                <div className="popular">
                    <h2 className="text-xl font-bold mb-4">Most popular cocktails:</h2>
                    <ul className="space-y-2">
                        {cocktailLists.map(renderListItem)}
                    </ul>
                </div>

                <div className="loved">
                    <h2 className="text-xl font-bold mb-4">Most loved mocktails:</h2>
                    <ul className="space-y-2">
                        {mockTailLists.map(renderListItem)}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Cocktails;
