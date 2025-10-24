import "@/style/components/usrPage/usrBackground.css"
import SearchYourFrist from "./usrBack/searchYourFrist";
import UsrIndex from "./usrBack/usrIndex";
import ConnectWalletFrist from "./usrBack/connectWallet";
import { UsrComponents } from "./usrBack/usrStateManage";
import type { PublicKey } from "@solana/web3.js";


export interface UsrBackgroundProps{
    openDomainQueryPage: () => void,
    setShowUsrComponent: React.Dispatch<React.SetStateAction<UsrComponents>>,
    showSearchFrist: boolean,
    searchKey: PublicKey | null
}


const UsrBackground: React.FC<UsrBackgroundProps> = ({
    openDomainQueryPage, setShowUsrComponent, showSearchFrist, searchKey
}) => {

    return(
        <div className="usrback">
            {searchKey? (
                (showSearchFrist)? (
                    <SearchYourFrist openDomainQueryPage={openDomainQueryPage}/>
                ):(
                    <UsrIndex usr={searchKey} setShowUsrComponent={setShowUsrComponent}/>
                )
            ):(
                <ConnectWalletFrist />
            )}
        </div>
    )
}

export default UsrBackground;
