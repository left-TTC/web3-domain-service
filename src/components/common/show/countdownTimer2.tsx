import React, { useEffect, useState } from 'react';

interface CountdownTimer2Props {
    targetTimestamp: number;
    onFinish?: () => void;
}

const CountdownTimer2: React.FC<CountdownTimer2Props> = ({ targetTimestamp, onFinish }) => {
    const [secondsLeft, setSecondsLeft] = useState(() => {
        const now = Date.now();
        const diff = targetTimestamp > 1e12 ? targetTimestamp - now : targetTimestamp * 1000 - now;
        return Math.max(Math.floor(diff / 1000), 0);
    });

    useEffect(() => {
        if (secondsLeft <= 0) {
            if (onFinish) onFinish();
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (onFinish) onFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, onFinish]);

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-2">
            剩余时间: <span className="text-white">{formatTime(secondsLeft)}</span>
        </p>
    );
};

export default CountdownTimer2;
