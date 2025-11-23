import "@/style/components/usrPage/usrBackground.css"
import SearchYourFrist from "./usrBack/searchYourFrist";
import UsrIndex from "./usrBack/usrIndex";
import ConnectWalletFrist from "./usrBack/connectWallet";
import UsrStateManage, { UsrComponents } from "./usrBack/usrStateManage";
import type { PublicKey } from "@solana/web3.js";


export interface UsrBackgroundProps{
    openDomainQueryPage: () => void,
    showingComponents: UsrComponents,
    setShowUsrComponent: React.Dispatch<React.SetStateAction<UsrComponents>>,
    showSearchFrist: boolean,
    searchKey: PublicKey | null
}


const UsrBackground: React.FC<UsrBackgroundProps> = ({
    openDomainQueryPage, setShowUsrComponent, showSearchFrist, searchKey, showingComponents
}) => {

    return(
        <div className="usrback">
            
            <div style={{zIndex:"1"}} className="usrbacka">
                {searchKey? (
                    (showSearchFrist)? (
                        <SearchYourFrist openDomainQueryPage={openDomainQueryPage}/>
                    ):(
                        <UsrIndex usr={searchKey} />
                    )
                ):(
                    <ConnectWalletFrist />
                )}

                {searchKey &&
                    <div className="manageposition">
                        <UsrStateManage 
                            showingComponents={showingComponents}
                            setShowUsrComponent={setShowUsrComponent}
                        />
                    </div>
                }
            </div>
            <img src="/background/usr/aaa.png" className="usrbacki" />
        </div>
    )
}

export default UsrBackground;
