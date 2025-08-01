

import "@/style/components/auction/domainRecommend/bar/refreshButton.css"

import refresh from "@/assets/refresh.svg"

export interface RefreshButtonProps {
    refreshRecommendDomain: () => void,
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
    refreshRecommendDomain
}) => {

    return(
        <button className="refreshbutton" onClick={() => refreshRecommendDomain()}>
            <img src={refresh} className="refreshbuicon" />
            <h1>refresh</h1>
        </button>
    )
}

export default RefreshButton;
