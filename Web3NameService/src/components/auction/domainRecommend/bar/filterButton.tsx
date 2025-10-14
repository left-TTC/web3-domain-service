import { useTranslation } from "react-i18next"

import filter from "@/assets/filter.svg"

import "@/style/components/auction/domainRecommend/bar/filterButton.css"
import { useRef, useState } from "react"
import Slider from "./tool/slider"
import { useAuctionStore } from "@/components/store/auctionRecommendStore"
import { lockYScroll, unlockYScroll } from "@/utils/functional/show/page/lockYScorll"

interface FilterButtonProps{
    refresh: () => void
}

const FilterButton: React.FC<FilterButtonProps> = ({
    refresh
}) => {

    const {t} = useTranslation()
    const store = useAuctionStore();

    const [showFilterMask, setShowFilterMask] = useState(false)

    const [inputvalue, setInputValue] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [inputFocus, setInputFocus] = useState(false)
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lower = e.target.value.toLowerCase();
        setInputValue(lower);
    };

    const [lengthValue, setLengthValue] = useState<number>(store.data.needDomainLength)

    const ifFilterValid = () => {
        if((lengthValue != 0 || inputvalue != "") && lengthValue > inputvalue.length)return true
        return false
    }

    const appleyFilter = () => {
        if(lengthValue!=0){
            store.setData({needDomainLength:lengthValue});
        }
        store.setData({mustConatData: inputvalue});
        refresh()
        setShowFilterMask(false)
        unlockYScroll()
    }

    return(
        <div className="filterblaa">
            <div className="filterbl" onClick={() => {setShowFilterMask(true); lockYScroll()}}>
                <img src={filter} className="filterimg" />
                <h1>{t("filter")}</h1>
            </div>
            {showFilterMask && 
                    <div className="filterMasks">
                        <div className="maskcontent">
                            <h1>{t("filterdomain")}:</h1>
                            <div className="containcontent">
                                <h1>{t("contain")}:</h1>
                                <input
                                    type="text"
                                    placeholder={t("character")}
                                    value={inputvalue}
                                    onChange={handleInput}
                                    ref={inputRef}
                                    className={`comtaincontentinput ${inputFocus? "inputcontainsfocus":""}`}
                                    onFocus={() => setInputFocus(true)}
                                    onBlur={() => setInputFocus(false)}
                                />
                            </div>
                            <div className="containcontent">
                                <h1>{t("length")}:</h1>
                                <Slider
                                    min={1}
                                    max={32}
                                    value={lengthValue}
                                    onChange={setLengthValue}
                                />
                            </div>
                            <div className="containconfirmandcancle">
                                <button className={`filterbu apply ${ifFilterValid()? "":"cannotclick"}`} onClick={() => appleyFilter()}>
                                    <h1>{t("apply")}</h1>
                                </button>
                                <button className="filterbu canclefilter" onClick={() => {setShowFilterMask(false); unlockYScroll()}}>
                                    <h1>{t("cancle")}</h1>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                }
        </div>
    )
}

export default FilterButton;