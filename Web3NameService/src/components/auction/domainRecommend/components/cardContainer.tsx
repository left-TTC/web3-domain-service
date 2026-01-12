

interface CardContainerProps {
    children: React.ReactNode, 
    highlight?: boolean,
}

const CardContainer: React.FC<CardContainerProps> = ({
    children, highlight
}) => {


    return (
        <div className={`
            bg-[#111] border rounded-[2rem] p-6 shadow-xl relative overflow-hidden group
            transition-all duration-500 hover:-translate-y-2
            ${highlight ? 'border-[#B4FC75]/40 bg-gradient-to-b from-[#1a1a1a] to-[#111]' : 'border-white/7'}
            `}
        >
            {children}
        </div>
    )
}

export default CardContainer;