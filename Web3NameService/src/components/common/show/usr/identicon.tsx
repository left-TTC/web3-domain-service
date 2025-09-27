import { pickPalette } from "@/utils/functional/show/usr/colorHelper";
import { rngFromString } from "@/utils/functional/show/usr/rngFromString";
import { memo } from "react";


type IdenticonProps = {
    pubkey: string;
    size?: number;       // px
    scale?: number;      // inner padding scale (0..1)
    grid?: number;       // grid size (odd number recommended, e.g. 5)
    round?: boolean;     // rounded squares
    seedOffset?: number; // optional offset so you can get variants
};


const Identicon: React.FC<IdenticonProps> = memo(({
    pubkey,
    size = 64,
    scale = 0.9,
    grid = 5,
    round = true,
    seedOffset = 0,
}) => {
    // normalize
    const g = Math.max(3, Math.floor(grid) || 5);
    const s = Math.max(16, Math.floor(size));
    const pad = Math.max(0.6, Math.min(1, scale));
    const colors = pickPalette(pubkey, seedOffset);
    const rng = rngFromString(pubkey, seedOffset);

    // grid logic: we'll mirror left half to right to create symmetric identicon
    const cols = g;
    const rows = g;
    const half = Math.ceil(cols / 2);

    // create boolean grid
    const cells: boolean[][] = [];
    for (let r = 0; r < rows; r++) {
        cells[r] = [];
        for (let c = 0; c < half; c++) {
        // decide filled or not using rng
        const v = rng();
        // bias threshold so we don't fill everything or nothing
        const threshold = 0.5 + (r - rows / 2) * 0.02 + (c - half / 2) * 0.02;
        cells[r][c] = v > threshold; // true => filled
        }
    }

    // Convert to full mirrored grid for drawing convenience
    const fullGrid: boolean[][] = [];
    for (let r = 0; r < rows; r++) {
        fullGrid[r] = [];
        for (let c = 0; c < cols; c++) {
        if (c < half) fullGrid[r][c] = cells[r][c];
        else fullGrid[r][c] = cells[r][cols - 1 - c];
        }
    }

    // shape params: corner radius factor, central motif toggle, rotation
    const cornerFactor = round ? Math.min(0.5, 0.25 + rng() * 0.25) : 0;
    const centralShape = rng() > 0.5;
    const rotate = Math.floor(rng() * 4) * 90; // 0/90/180/270

    // layout math
    const viewBoxSize = s;
    const padding = (1 - pad) * viewBoxSize * 0.5;
    const drawable = viewBoxSize - padding * 2;
    const cellSize = drawable / cols;
    const cellGap = Math.max(0, Math.floor(cellSize * 0.08)); // small gap
    const r = Math.max(0, Math.floor(cellSize * cornerFactor));

    // small helper to escape ids for svg defs
    const idSafe = pubkey.replace(/[^a-zA-Z0-9]/g, "") + "_" + seedOffset;

    return (
        <svg
        width={s}
        height={s}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Identicon for ${pubkey}`}
        style={{ borderRadius: Math.min(12, s * 0.12), display: "block" }}
        >
        {/* background */}
        <rect x="0" y="0" width={viewBoxSize} height={viewBoxSize} fill={colors.bg} />

        {/* subtle pattern overlay (very light) */}
        <defs>
            <linearGradient id={`g_${idSafe}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={colors.bg} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.04" />
            </linearGradient>
        </defs>
        <rect x="0" y="0" width={viewBoxSize} height={viewBoxSize} fill={`url(#g_${idSafe})`} />

        {/* grid cells */}
        <g transform={`translate(${padding}, ${padding}) rotate(${rotate}, ${drawable / 2}, ${drawable / 2})`}>
            {fullGrid.map((rowArr, rIdx) =>
            rowArr.map((filled, cIdx) => {
                if (!filled) return null;
                const x = cIdx * cellSize + cellGap * 0.5;
                const y = rIdx * cellSize + cellGap * 0.5;
                const w = cellSize - cellGap;
                const h = cellSize - cellGap;
                // alternate colors a bit to add variety
                const useAccent = ((rIdx + cIdx) % 3) === 0;
                const fillColor = useAccent ? colors.secondary : colors.primary;
                return (
                <rect
                    key={`${rIdx}_${cIdx}`}
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={r}
                    ry={r}
                    fill={fillColor}
                />
                );
            })
            )}
        </g>

        {/* optional central motif */}
        {centralShape && (
            <g transform={`translate(${viewBoxSize / 2}, ${viewBoxSize / 2})`}>
            <circle
                cx="0"
                cy="0"
                r={viewBoxSize * 0.13}
                fill={colors.accent}
                opacity={0.95}
            />
            <circle
                cx="0"
                cy="0"
                r={viewBoxSize * 0.06}
                fill={colors.bg}
                opacity={0.9}
            />
            </g>
        )}

        {/* small signature dots (purely decorative, deterministic) */}
        <g opacity="0.9">
            <circle cx={viewBoxSize * 0.12} cy={viewBoxSize * 0.85} r={viewBoxSize * 0.02} fill={colors.primary} />
            <circle cx={viewBoxSize * 0.2} cy={viewBoxSize * 0.88} r={viewBoxSize * 0.015} fill={colors.secondary} />
        </g>
        </svg>
    );
});

export default Identicon;