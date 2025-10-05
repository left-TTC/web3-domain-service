

export enum CardStyle {
    A = "CardOne",
    B = "CardTwo",
    C = "CardThree",
}

export function getCardStyleFromName(
    domainName: string
): string {
    let hash = 0;
    for (let i = 0; i < domainName.length; i++) {
        hash = (hash * 31 + domainName.charCodeAt(i)) >>> 0; 
    }

    const state = [CardStyle.A, CardStyle.B, CardStyle.C];
    const index = hash % state.length;

    return state[index];
}