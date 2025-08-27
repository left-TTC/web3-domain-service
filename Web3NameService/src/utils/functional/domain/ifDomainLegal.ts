


export function ifDomainLegal(
    domainName: string
): boolean {
    if(domainName.includes("."))return false
    return true
}