import React, { createContext, useContext, useState } from "react"

interface ReferrerContextState {
    referrer: string | null
    setReferrer: (ref: string | null) => void
}

const ReferrerContext = createContext<ReferrerContextState | null>(null)

export const ReferrerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [referrer, setReferrer] = useState<string | null>(null)

    return (
        <ReferrerContext.Provider value={{ referrer, setReferrer }}>
            {children}
        </ReferrerContext.Provider>
    )
}

export const useReferrer = () => {
    const ctx = useContext(ReferrerContext)

    if (!ctx) {
        throw new Error("useReferrer must be used inside ReferrerProvider")
    }

    return ctx
}