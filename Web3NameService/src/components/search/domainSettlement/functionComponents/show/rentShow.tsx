

import loading from "@/assets/loading.svg"
import "@/style/components/search/domainSettlement/functionComponents/show/rentShow.css"

export interface RentShowProps {
    ifCalculating: boolean,
    stateRent: number,
    recordRent: number,
}

const RentShow: React.FC<RentShowProps> = ({
    ifCalculating, stateRent, recordRent
}) => {


    return(
        <div className="rentshow">
            {ifCalculating? (
                <div className="rentshowblsloading">
                    <h1>RentExemption</h1>
                    <img src={loading} className="rentshowLoading"/>
                </div>
            ):(
                <div className="rentshowbl">
                    {!stateRent && !recordRent &&
                        <div className="rentshowbls">
                            <h1>RentExemption</h1>
                            <h2>NULL</h2>
                        </div>
                    }
                    {(stateRent | recordRent )&&
                        <div className="rentshowblbetween">
                            <h1>——RentExemption——</h1>
                        </div>
                    }
                    {stateRent &&
                        <div className="rentshowbls">
                            <h1>Auction Account</h1>
                            <h2>{(stateRent/1e9).toFixed(4)} SOL</h2>
                        </div>
                    }
                    {recordRent &&
                        <div className="rentshowbls">
                            <h1>Refferrer Account</h1>
                            <h2>{(recordRent/1e9).toFixed(4)} SOL</h2>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default RentShow;
