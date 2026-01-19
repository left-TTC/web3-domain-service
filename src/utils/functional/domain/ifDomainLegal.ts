


export function ifDomainLegal(
    domainName: string
): boolean {
    if(domainName.includes("."))return false
    return true
}


export function ifRootValid(
    rootName: string
): boolean {
    return (
        rootName.length > 0 &&
        !/\s/.test(rootName) &&
        rootName === rootName.toLowerCase()
    )
  
}