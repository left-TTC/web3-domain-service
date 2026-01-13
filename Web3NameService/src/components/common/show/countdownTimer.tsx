import { useEffect, useMemo, useRef, useState } from "react";
import { Clock } from "lucide-react";

interface CountDownTimerProps {
    initialMinutes: number;
    onFinish?: () => void;
}

export function CountDownTimer({
    initialMinutes,
    onFinish,
}: CountDownTimerProps) {
    const endTimeRef = useRef<number>(
        Date.now() + initialMinutes * 60_000
    );

    const [now, setNow] = useState(Date.now());
    const finishedRef = useRef(false);

    
    useEffect(() => {
        endTimeRef.current = Date.now() + initialMinutes * 60_000;
        finishedRef.current = false;
        setNow(Date.now());
    }, [initialMinutes]);

    
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 30_000);

        return () => clearInterval(timer);
    }, []);

    const { hours, minutes, isFinished } = useMemo(() => {
        const diffMs = endTimeRef.current - now;

        if (diffMs <= 0) {
            return { hours: 0, minutes: 0, isFinished: true };
        }

        const totalMinutes = Math.ceil(diffMs / 60_000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes, isFinished: false };
    }, [now]);

    useEffect(() => {
        if (isFinished && !finishedRef.current) {
            finishedRef.current = true;
            onFinish?.();
        }
    }, [isFinished, onFinish]);

    return (
        <div className="flex justify-between items-center px-2">
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Clock size={12} /> 剩余时间
            </span>
            <span className="text-xs font-bold font-mono text-white">
                {hours}h {minutes}m
            </span>
        </div>
    );
}
