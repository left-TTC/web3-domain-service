

import "@/style/components/index/downloadBrave/downloadBrave.css"
import { useTranslation } from "react-i18next";

const DownloadBrave = () => {

    const {t} = useTranslation()

    return(
        <div className="downloadbrave">
            <h1>{t("usedomain")}</h1>
        </div>
    )
}

export default DownloadBrave;
