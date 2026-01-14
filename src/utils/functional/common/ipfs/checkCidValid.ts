



export async function checkCidValid(cid: string): Promise<boolean> {
    try {
        const res = await fetch(`https://ipfs.io/ipfs/${cid}`, { method: "HEAD" })
        return res.ok
    } catch {
        console.log("can't ping")
        return true
    }
}