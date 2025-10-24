import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { ADMIN } from "@/utils/constants/constants";
import { useEffect, useRef, useState } from "react";

export function useKonamiLikeListener() {

    const {publicKey: usr} = useWalletEnv()

    const [adminModel, setAdminModel] = useState(false)

    const currentIndex = useRef(0);

    useEffect(() => {
        if(!usr)return
        if(usr?.toBase58() != ADMIN.toBase58())return
        
        const sequence = [
            "ArrowUp", "ArrowUp",
            "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight",
            "ArrowLeft", "ArrowRight",
            "b", "a", "b", "a"
        ];

        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();

            if (key === sequence[currentIndex.current].toLowerCase()) {
                currentIndex.current++;
                console.log(currentIndex.current)
                if (currentIndex.current === sequence.length) {
                    setAdminModel(prev => !prev);
                    currentIndex.current = 0;
                }
            } else {
                currentIndex.current = 0; 
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [usr]);

    return { adminModel }
}
