


export function ifDomainLegal(
    domainName: string
): boolean {
    if(domainName.includes("."))return false

    const searchingPattern = /^[a-z]+$/;
    
    return searchingPattern.test(domainName);
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