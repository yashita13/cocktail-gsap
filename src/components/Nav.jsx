import {navLinks} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

const Nav = ({ onCartClick, totalCount }) => {    useGSAP(()=>{
        const navTween=gsap.timeline({
            scrollTrigger:{
                trigger:'nav',
                start: 'bottom top'
            }
        });
    //     defines when animation will start applying

        navTween.fromTo('nav',
            {backgroundColor:'transparent'},
            {backgroundColor:'#00000050',
                backgroundFilter: 'blur(10px)',
                duration:1,
                ease:'power1.inOut',
            });
    //      what will happen

    })

    return (
        <nav>
            <div>
                <a href="#home" className='flex items-center gap-2'>
                    <img src="/images/logo.png" />
                    <p>Lush Sips</p>
                </a>

                <ul>
                    {navLinks.map((link)=>(
                         <li key={link.id}>
                            <a href={`#${link.id}`}>
                                {link.title}
                            </a>
                        </li>
                    ))}

                    <div className="relative">
                        <img
                            src="/images/cart3.png"
                            alt="Cart"
                            className="cursor-pointer w-7 h-7"
                            onClick={onCartClick}
                        />
                        {totalCount > 0 && (
                            <span
                                className="
                                        absolute -top-0 -right-0
                                        bg-red-700 text-white rounded-full font-semibold
                                        flex items-center justify-center leading-none

                                        w-6 h-6 text-xs
                                        sm:w-6 sm:h-6 sm:text-xs sm:-top-0 sm:-right-0
                                        md:w-6 md:h-6 md:text-sm md:-top-0 md:-right-0
                                        lg:w-6 lg:h-6 lg:text-sm lg:-top-0 lg:-right-2
                                        xl:w-6 xl:h-6 xl:text-sm xl:-top-0 xl:-right-2
                                      "
                            >                                {totalCount}
                            </span>
                        )}
                    </div>


                </ul>
            </div>
        </nav>
    )
}

export default Nav;