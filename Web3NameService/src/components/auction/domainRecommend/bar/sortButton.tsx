

import sort from "@/assets/sort.svg"

import "@/style/components/auction/domainRecommend/bar/sortButton.css"

const SortButton = () => {


    return(
        <button className="sortbl">
            <img src={sort} className="sortimg" />
        </button>
    )
}

export default SortButton;