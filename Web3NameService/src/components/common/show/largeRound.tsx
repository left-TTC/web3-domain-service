

import "@/style/components/commonStyle/show/largeRound.css"

export interface LargeRoundProps{
    className?: string;
}

const LargeRound: React.FC<LargeRoundProps> = ({
    className
}) => {


    return(
        <div className={`largeround ${className}`} />
    )
}

export default LargeRound;
