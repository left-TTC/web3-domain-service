
import "@/style/components/topbar/navigation/navigation.css"
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

export enum NavigationLists{
    Home = "Home",
    Auction = "Marketplace",
    Docus = "Docus",
}

const Navigation = () => {

    const navigate = useNavigate()
    const {t} = useTranslation()

    const returnNavigateName = (navigateObject: NavigationLists) => {
        switch(navigateObject){
            case NavigationLists.Home:
                return t("home");
            case NavigationLists.Auction:
                return t("auction");
            case NavigationLists.Docus:
                return t("docus");
        }
    }

    const navigateTo = (navigateObject: NavigationLists) => {
        switch(navigateObject){
            case NavigationLists.Home:
                navigate('/');
                break;
            case NavigationLists.Auction:
                navigate('/auction');
                break
            case NavigationLists.Docus:
                return t("docus");
        } 
    }

    return(
        <div className="navigation">
            {Object.values(NavigationLists).map(navigateObject => (
                <button className="navigatebutton" onClick={() => navigateTo(navigateObject)}>
                    <h1>{returnNavigateName(navigateObject)}</h1>
                </button>
            ))}
        </div>
    )
}

export default Navigation;
