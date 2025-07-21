import { useEffect, useRef, useState } from "react";


import "@/style/components/auction/rootDomainCreate/children/rollStar.css"
import { Starfield } from "@/utils/functional/common/class/star";
import commonFire from "@/../public/background/star/shot1.png";
import superFire from "@/../public/background/star/shot2.png";


export interface RollStarProps {
    ifAddedFuel: boolean,
}

const RollStar: React.FC<RollStarProps> = ({
    ifAddedFuel
}) => {

    const rollStar = useRef<HTMLDivElement | null> (null)

    const starfieldInstance = useRef<Starfield | null>(null);

    useEffect(() => {
        if(rollStar.current){
            
            if (rollStar) {
                console.log("with: ", rollStar.current.clientWidth)
                starfieldInstance.current = new Starfield(rollStar.current, rollStar.current.clientWidth, rollStar.current.clientHeight, 50);
            } else {
                console.error('star-container not found');
            }
        }

        return () => {
            if (starfieldInstance.current) {
                starfieldInstance.current.destroy();
            }
        };
    }, [rollStar.current])


    return(
        <div className="rollstar" ref={rollStar}>
            <img src={commonFire} className="commonfire" />
        </div>
    )
}

export default RollStar;