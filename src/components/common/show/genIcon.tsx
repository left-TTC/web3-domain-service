
interface PixelAvatarProps {
    text: string;      
    size?: number;   
    pixelCount?: number; 
}

const COLORS = [
    "#B4FC75",
    "#FF9F1C",
    "#2EC4B6",
    "#FF6B6B",
    "#8338EC",
    "#3A86FF",
];

function hashStringToNumber(str: string, max: number) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % max;
}

export function PixelAvatar({
    text,
    size = 40,
    pixelCount = 5,
}: PixelAvatarProps) {
    const color = COLORS[hashStringToNumber(text, COLORS.length)];
 
    const grid: boolean[][] = [];
    const hash = Array.from(text).map(c => c.charCodeAt(0));
    for (let y = 0; y < pixelCount; y++) {
        grid[y] = [];
        for (let x = 0; x < Math.ceil(pixelCount / 2); x++) {
        const value = hash[(y * Math.ceil(pixelCount / 2) + x) % hash.length];
        grid[y][x] = value % 2 === 0;
        }
    }
 
    const fullGrid = grid.map(row => [
        ...row,
        ...row.slice(0, pixelCount - row.length).reverse(),
    ]);

    const pixelSize = size / pixelCount;

    return (
        <div
            className={`rounded-xl flex items-center justify-center transition-all cursor-pointer hover:opacity-90`}
            style={{
                width: size,
                height: size,
                backgroundColor: "#ffffff0d", // 背景色
            }}
        >
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${pixelCount}, ${pixelSize}px)`,
                    gridTemplateRows: `repeat(${pixelCount}, ${pixelSize}px)`,
                }}
            >
                {fullGrid.flatMap((row, y) =>
                    row.map((filled, x) => (
                        <div
                            key={`${x}-${y}`}
                            style={{
                                width: pixelSize,
                                height: pixelSize,
                                backgroundColor: filled ? color : "transparent",
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
