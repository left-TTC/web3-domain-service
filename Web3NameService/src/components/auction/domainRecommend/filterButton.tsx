import { useTranslation } from "react-i18next"

import filter from "@/assets/filter.svg"

import "@/style/components/auction/domainRecommend/filterButton.css"

const FilterButton = () => {

    const {t} = useTranslation()

    return(
        <button className="filterbl">
            <img src={filter} className="filterimg" />
            <h1>{t("filter")}</h1>
        </button>
    )
}

export default FilterButton;