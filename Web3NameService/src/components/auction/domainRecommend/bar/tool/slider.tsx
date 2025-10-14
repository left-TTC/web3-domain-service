// Slider.tsx
import React from "react";

interface SliderProps {
    min?: number; 
    max?: number;
    value: number;
    onChange: (val: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min = 0, max = 32, value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = Number(e.target.value);
        if (isNaN(val)) val = min;
        if (val < min) val = min;
        if (val > max) val = max;
        onChange(val);
    };

    return (
        <div className="slider-container">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                className="slider"
            />
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={handleInputChange}
                className="slider-value"
            />
        </div>
    );
};

export default Slider;
