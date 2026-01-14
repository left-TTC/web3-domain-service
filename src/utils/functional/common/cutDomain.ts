

export function cutDomain(domain: string){
    if (typeof domain !== 'string') return [];
    return domain.split('.');
}

export function ifDomainValid(domain: string):boolean {
    if (/[A-Z]/.test(domain)) return false;

    const valid = /^[a-z0-9.-]+$/.test(domain);
    return valid;
}