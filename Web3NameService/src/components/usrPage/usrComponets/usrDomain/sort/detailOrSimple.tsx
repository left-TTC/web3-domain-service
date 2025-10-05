import { SortStyle } from "../domainBlock";

import simple from "@/assets/simple.svg"
import simplegreen from "@/assets/simpleblack.svg"
import detail from "@/assets/detail.svg"
import detailGreen from "@/assets/detailblank.svg"

import "@/style/components/usrPage/usrComponents/usrDomain/sort/detailOrSimple.css"

export interface DetailOrSimpleProps {
    nowShowWay: SortStyle,
    setShowWay: React.Dispatch<React.SetStateAction<SortStyle>>,
}

const DetailOrSimple: React.FC<DetailOrSimpleProps> = ({
    nowShowWay, setShowWay
}) => {


    return(
        <div className="detailorsimple">
            <button 
                className={`sortShowone ${nowShowWay === SortStyle.Detail? "activeSort":"" }`}
                onClick={() => {setShowWay(SortStyle.Detail)}}  
            >
                {nowShowWay === SortStyle.Detail?
                    <img src={detailGreen} className="detailsortimg"/>
                    :
                    <img src={detail} className="detailsortimg"/>
                }
            </button>
            <button 
                className={`sortShowone ${nowShowWay === SortStyle.Simple? "activeSort":"" }`}
                onClick={() => {setShowWay(SortStyle.Simple)}}    
            >
                {nowShowWay === SortStyle.Simple?
                    <img src={simplegreen} className="simpleSortimg"/>
                    :
                    <img src={simple} className="simpleSortimg"/>
                }
            </button>
        </div>
    )
}

export default DetailOrSimple;
