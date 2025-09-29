import "@/style/components/usrPage/usrBackground.css"
import SearchYourFrist from "./usrBack/searchYourFrist";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import UsrIndex from "./usrBack/usrIndex";
import ConnectWalletFrist from "./usrBack/connectWallet";
import { UsrComponents } from "./usrBack/usrStateManage";


export interface UsrBackgroundProps{
    openDomainQueryPage: () => void,
    setShowUsrComponent: React.Dispatch<React.SetStateAction<UsrComponents>>,
    showSearchFrist: boolean
}


const UsrBackground: React.FC<UsrBackgroundProps> = ({
    openDomainQueryPage, setShowUsrComponent, showSearchFrist
}) => {

    const {publicKey: usr} = useWalletEnv()
    

    return(
        <div className="usrback">
            {usr? (
                (showSearchFrist)? (
                    <SearchYourFrist openDomainQueryPage={openDomainQueryPage}/>
                ):(
                    <UsrIndex usr={usr} hintCom={[UsrComponents.Auction]} setShowUsrComponent={setShowUsrComponent}/>
                )
            ):(
                <ConnectWalletFrist />
            )}
        </div>
    )
}

export default UsrBackground;
