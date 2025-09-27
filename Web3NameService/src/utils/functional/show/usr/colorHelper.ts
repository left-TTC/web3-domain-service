import { rngFromString } from "./rngFromString";


export function hslToHex(h: number, s: number, l: number) {
    // h: 0-360, s,l: 0-100
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const color = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}


export function pickPalette(pubkey: string, offset = 0) {
    const rng = rngFromString(pubkey, offset);
    const hue = Math.floor(rng() * 360);
    const sat = 45 + Math.floor(rng() * 30); // 45..75
    const light = 40 + Math.floor(rng() * 20); // 40..60
    const accentHue = (hue + Math.floor(rng() * 60) + 120) % 360;
    const backgroundLight = 92 - Math.floor(rng() * 8); // 84..92
    return {
        bg: hslToHex(hue, 10, backgroundLight),
        primary: hslToHex(hue, sat, light),
        secondary: hslToHex(accentHue, Math.min(85, sat + 10), Math.min(70, light + 10)),
        accent: hslToHex((hue + 180) % 360, Math.min(90, sat + 5), Math.max(30, light - 10)),
    };
}