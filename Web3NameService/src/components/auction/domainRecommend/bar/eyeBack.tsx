
import eye from "/background/hero/eye.png"

import "@/style/components/auction/domainRecommend/bar/eyeBack.css"

const EyeBack = () => {


    return(
        <div className="eyeback">
            <div className="eyebl">
                <img src={eye} className="eyebackicon" />
            </div>
            <div className="eyeline" />
        </div>
    )
}

export default EyeBack;
