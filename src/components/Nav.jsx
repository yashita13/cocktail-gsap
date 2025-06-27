import {navLinks} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

const Nav = () => {
    useGSAP(()=>{
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
                    <a href="#">
                    <img src="/images/cart3.png" />
                    </a>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;