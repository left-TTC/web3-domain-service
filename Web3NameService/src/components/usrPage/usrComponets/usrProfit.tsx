
interface UsrProfitProps {
    usrProfit: number | null,
    usrVolume: number | null,
}

const UsrProfit: React.FC<UsrProfitProps> = ({
    usrProfit, usrVolume
}) => {
    


    return (
        <div className="usrprofit">
            <div className="profitandvolume">
                <h1>profit: {usrProfit? `${(usrProfit / 1e9).toFixed(4)} SOL`:"0"}</h1>
                <h2>volume: {usrVolume? `${(usrVolume / 1e9).toFixed(4)} SOL`:"0"}</h2>
            </div>
        </div>
    )
}

export default UsrProfit;