


export function cutString(
    inputString: string,
    frontLength: number,
    endLength: number,
    separator: string = "...",
): string{
    const frontPart = [...inputString].slice(0, frontLength).join('');
    const endPart = [...inputString].slice(-endLength).join('');

    return `${frontPart}${separator}${endPart}`;
}