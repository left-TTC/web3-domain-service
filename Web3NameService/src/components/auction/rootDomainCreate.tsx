import { getAndReturnNowPosition } from "@/utils/functional/show/page/getAndReturnNowPosition";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreatingRootShow from "./rootDomainCreate/creatingRootShow";
import CreateRootPost from "./rootDomainCreate/createRootPost";




export default function RootDomainCreate(){

    const {t} = useTranslation()
    
    const [showLaunchSettle, setShowLaunchSettle] = useState(false)
    const [backFn, setBackFn] = useState<()=>void>(()=>{})

    const openLanunchSettleAndRecordPosition = () => {
        setBackFn(() => getAndReturnNowPosition(false))
        setShowLaunchSettle(true)
    }

    return(
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 relative overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.08]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15]"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-16 relative z-10 flex flex-col gap-20 mt-30">
                <CreatingRootShow
                    openLanunchSettleAndRecordPosition={openLanunchSettleAndRecordPosition}
                />
                <CreateRootPost />
            </main>
        </div>
    )

}