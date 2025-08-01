


export async function generateRandomStringsFromDictionary(
    charLength: number, count: number
): Promise<string[]> {

    const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json");
    const dictionary: { [ word: string ]: boolean} = await response.json();
    const words = Object.keys(dictionary).filter(word => word.length === charLength);

    const resultString: string[] = [];

    for (let i = 0; i < count; i++) {
    let current = "";
    while (current.length < charLength) {
         const word = words[Math.floor(Math.random() * words.length)];
        if (current.length + word.length <= charLength) {
            current += word;
        }
    }
        resultString.push(current);
    }

    return resultString;
}