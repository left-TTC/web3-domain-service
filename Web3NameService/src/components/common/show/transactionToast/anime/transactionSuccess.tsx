import React, { useEffect, useRef } from "react";

type TransactionSuccessProps = {
    size?: number;
    color?: string;
    confetti?: boolean;
    onAnimationEnd?: () => void;
    className?: string;
};

const TransactionSuccess: React.FC<TransactionSuccessProps> = ({
    size = 120,
    color = "#B4FC75",
    onAnimationEnd,
    className,
}) => {
    const pathRef = useRef<SVGPathElement>(null);
    const totalDuration = 2000; 

    useEffect(() => {
        const path = pathRef.current;
        if (path) {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.style.animation = "check-draw 800ms cubic-bezier(.2,.9,.3,1) 800ms forwards";
        }

        const timer = setTimeout(() => {
            onAnimationEnd?.();
        }, totalDuration);

        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    const stroke = 6;
    const viewBox = 120;
    const center = viewBox / 2;
    const radius = center - stroke;

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
                display: "inline-block",
                position: "relative",
            }}
            aria-hidden={false}
            role="img"
            aria-label="Transaction successful"
        >
            <style>{`
                @keyframes ring-draw {
                    0% { stroke-dashoffset: ${Math.PI * 2 * radius}; opacity: 0; transform: rotate(-90deg); }
                    60% { stroke-dashoffset: 0; opacity: 1; transform: rotate(-90deg); }
                    100% { stroke-dashoffset: 0; opacity: 1; transform: rotate(-90deg); }
                }

                @keyframes check-draw {
                    0% { stroke-dashoffset: 0; opacity: 0; }
                    40% { opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 1; }
                }

                @keyframes pop {
                    0% { transform: scale(0.9); opacity: 0; }
                    60% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }

                @keyframes confetti-fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-40px) rotate(200deg); opacity: 0; }
                }

                .txs-wrap {
                    width: 100%;
                    height: 100%;
                    display: inline-grid;
                    place-items: center;
                    animation: pop 600ms cubic-bezier(.2,.9,.3,1) forwards;
                }

                .txs-svg {
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                .txs-ring {
                    fill: none;
                    stroke: ${color};
                    stroke-width: ${stroke};
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: ${Math.PI * 2 * radius};
                    stroke-dashoffset: ${Math.PI * 2 * radius};
                    transform-origin: 50% 50%;
                    animation: ring-draw 800ms ease-out forwards;
                }

                .txs-check {
                    fill: none;
                    stroke: ${color};
                    stroke-width: ${stroke};
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
            `}</style>

            <div className="txs-wrap">
                <svg
                    className="txs-svg"
                    viewBox={`0 0 ${viewBox} ${viewBox}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="txs-ring"
                        cx={center}
                        cy={center}
                        r={radius}
                    />
                    <path
                        ref={pathRef}
                        className="txs-check"
                        d={`M ${center - 22} ${center} L ${center - 6} ${center + 16} L ${center + 26} ${center - 14}`}
                    />
                </svg>
            </div>
        </div>
    );
};

export default TransactionSuccess;
