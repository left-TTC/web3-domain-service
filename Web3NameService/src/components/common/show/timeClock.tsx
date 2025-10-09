import { useEffect, useState } from "react";

import "@/style/components/commonStyle/show/timeClock.css"

type Props = {
    target: number;
    onExpire?: () => void;
};

function secondsUntil(target: number) {
  const nowMs = Date.now();
  const targetMs = target > 1e12 ? target : target * 1000;
  return Math.max(0, Math.floor((targetMs - nowMs) / 1000));
}

function formatHHMM(totalSeconds: number) {
    const mins = Math.floor(totalSeconds / 60);
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
}

export default function TimeClock({ target, onExpire }: Props) {
    const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(target));

    useEffect(() => {
        if (secondsLeft <= 0) {
            onExpire?.();
            return;
        }

        const timer = setInterval(() => {
        setSecondsLeft((s) => {
            const next = s - 1;
            if (next <= 0) {
            clearInterval(timer);
            onExpire?.();
            }
            return Math.max(0, next);
        });
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, onExpire]);

    return (
        <div className="timeclock">
            <h1>{formatHHMM(secondsLeft)}</h1>
        </div>
    )
}
