

import cart from "@/assets/cart.svg"
import { useTranslation } from "react-i18next";

import "@/style/components/auction/domainRecommend/bar/cartButton.css"
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

const CartButton = () => {

    const {t} = useTranslation()

    const allCartRef = useRef<HTMLDivElement | null>(null)
    const cartSettleRef = useRef<HTMLDivElement | null>(null)

    const [showUsrCart, setShowUsrCart] = useState(false)

    useEffect(() => {
        if(showUsrCart){
            if(allCartRef.current){
                animate(allCartRef.current, {
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    duration: 300
                })
            }
        }

        const clickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if(cartSettleRef.current){
                if(allCartRef.current && !cartSettleRef.current.contains(target) ){
                    animate(cartSettleRef.current, {
                        scale: [1, 0.9],
                        opacity: [1, 0],
                        duration: 300,
                        onComplete: () => {
                            setShowUsrCart(false)
                        }
                    })
                }
            }
        }

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };

    }, [showUsrCart])

    
    return(
        <div>
            <button className="cartbu" onClick={() => setShowUsrCart(true)}>
                <img src={cart} className="cartbuicon" />
                <h1>My Cart</h1>
            </button>

            {showUsrCart &&
                <div className="usrcart" ref={allCartRef}>
                    <div className="cartsettle" ref={cartSettleRef}>

                    </div>
                </div>
            }
        </div>
    )
}

export default CartButton;
