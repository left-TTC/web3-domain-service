import type { RefObject } from "react";
import type { ChangeAndGoRootHandle } from "../changeAndGoRoot/changeAndGoRoot";
import { animate } from "animejs";



export function useClinkSetRoot(
    showChangeRoot: boolean,
    compRef: RefObject<ChangeAndGoRootHandle | null>, 
    setShowChangeRoot: React.Dispatch<React.SetStateAction<boolean>>,
){
    const ClinkSetRoot = () => {
        if(showChangeRoot){
            const changeRootcurrent = compRef;
            if(!changeRootcurrent) return;

            animate(changeRootcurrent, {
                duration: 300,
                opacity: [1, 0],
                onComplete: ()=>{
                    setShowChangeRoot(!showChangeRoot)
                }
            })
        }else{
            setShowChangeRoot(true)

            setTimeout(() => {
                const changeRootcurrent = compRef.current;

                if(!changeRootcurrent) return;
                animate(changeRootcurrent, {
                    opacity: [0, 1],
                    duration: 300,
                })
            }, 10) 
        }
    }

    return {ClinkSetRoot}
}