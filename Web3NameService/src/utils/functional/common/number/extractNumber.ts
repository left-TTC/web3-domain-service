


export function extractNumber(input: string): number | null {
    const match = input.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : null;
}