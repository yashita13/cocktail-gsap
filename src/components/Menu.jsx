'use client';
import {allCocktails} from "../../constants/index.js";
import {useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Menu = ({ quantities, setQuantities }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const totalCocktails=allCocktails.length;

    const goToSlide=(index)=>{
        const newIndex=(index+totalCocktails)%totalCocktails;   // 0->1->2->3->0 ....since 4 cocktails now

        setCurrentIndex(newIndex);
    }

    const getCocktailAt=(indexOffset)=>{
        return allCocktails[(currentIndex+indexOffset+totalCocktails)%totalCocktails];
    }

    const currentCocktail =getCocktailAt(0);
    const prevCocktail =getCocktailAt(-1);
    const nextCocktail=getCocktailAt(1);


    const contentRef=useRef();


    const addToCart = () => {
        setQuantities((prev) => {
            const current = prev[currentCocktail.name] || 0;
            return { ...prev, [currentCocktail.name]: current + 1 };
        });
    };


    useGSAP(()=>{
        gsap.fromTo('#title',{opacity:0}, {opacity:1, duration:1});
        gsap.fromTo('.cocktail img',
            {opacity:0, xPercent:-100},
            {opacity:1, xPercent:0, duration:1, ease:'power1.inOut'}
        );
        gsap.fromTo('.details  h2',
            {yPercent:100, opacity:0},
            {yPercent:0, opacity:100, ease:'power1.inOut'}
        );
        gsap.fromTo('.details  p',
            {yPercent:100, opacity:0},
            {yPercent:0, opacity:100, ease:'power1.inOut'}
        );

        gsap.timeline({
            scrollTrigger:{
                trigger:'#menu',
                start:'top top',
                end:'bottom top',
                scrub:true,
            }
        })

            .to('.m-left-leaf', {y:-200},0)
            .to('.m-right-leaf', {y:200},0)

    },[currentCocktail]);



    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" className="m-left-leaf"/>
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" className="m-right-leaf" />

            <h2 id="menu-heading" className="sr-only">
                Cocktail Menu
            </h2>

            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {allCocktails.map((cocktail, index)=>{
                    const isActive=index===currentIndex;

                     return (
                         <button key={cocktail.id} className={`
                         ${isActive
                         ? 'text-white border-white'
                         : 'text-white/50 border-white/50'}
                         `}

                         onClick={()=>goToSlide(index)}
                         >
                             {cocktail.name}
                         </button>
                     )
                })}
            </nav>

            <div className="content">
                <div className="arrows">
                    <button className="text-left" onClick={()=> goToSlide(currentIndex-1)}>
                        <span>{prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                    </button>

                    <button className="text-left" onClick={()=> goToSlide(currentIndex+1)}>
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    </button>
                </div>

                <div className="cocktail">
                    <img src={currentCocktail.image} className="object-contain" />
                </div>

                <div className="recipe">
                    <div className="info" ref={contentRef}>
                        <p>Recipe for :</p>
                        <p className="mb-5 md:mb-0 xl:mb-30" id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>
                            {currentCocktail.title} - ₹{currentCocktail.price}
                        </h2>
                        <p>{currentCocktail.description}</p>
                        <button
                            onClick={addToCart}
                            className="mt-4 bg-white text-black font-semibold text-sm px-4 py-2 rounded hover:bg-white/90 transition-all"
                            id="add-to-cart-btn"
                        >
                            + Add to Cart
                        </button>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu;
