

export function checkCidFormat(cidStr: string): boolean {
    if(cidStr.length > 42){
        return true
    }

    return false
}
