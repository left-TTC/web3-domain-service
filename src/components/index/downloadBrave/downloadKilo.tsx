

import Kilo from "./kilo";
import KiloShow from "./kiloShow";

const DownloadKilo = () => {

    return(
        <section className="relative w-full min-h-screen bg-[#000] flex items-center overflow-hidden border-y border-white/5  rounded-[2rem]">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#B4FC75]/10 blur-[150px] rounded-full opacity-50"/>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#B4FC75]/5 blur-[180px] rounded-full opacity-30"/>

            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <Kilo />  
                <KiloShow />
            </div>
        </section>
    )
}

export default DownloadKilo;
