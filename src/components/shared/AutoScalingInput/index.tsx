import React, { useState, useRef, useEffect, useCallback } from 'react';
import './AutoScalingInput.css';

interface AutoScalingInputProps {
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
    className?: string;
    baseFontSize?: number;
    minFontSize?: number;
}

export const AutoScalingInput = ({
    value,
    onChange,
    min,
    max,
    className = '',
    baseFontSize = 16,
    minFontSize = 8,
}: AutoScalingInputProps) => {
    const [fontSize, setFontSize] = useState(baseFontSize);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateFontSize = useCallback(() => {
        const input = inputRef.current;
        const container = containerRef.current;

        if (!input || !container) return;

        const baseSize = baseFontSize;
        const minSize = minFontSize;

        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'nowrap';
        span.style.fontSize = `${baseSize}px`;
        span.style.fontFamily = window.getComputedStyle(input).fontFamily;
        span.textContent = value.toString();

        document.body.appendChild(span);
        const textWidth = span.offsetWidth;
        document.body.removeChild(span);

        const containerWidth = container.clientWidth - 16;

        if (textWidth > containerWidth) {
            const newFontSize = (containerWidth / textWidth) * baseSize;
            setFontSize(Math.max(minSize, newFontSize));
        } else {
            setFontSize(baseSize);
        }
    }, [baseFontSize, minFontSize, value]);

    useEffect(() => {
        updateFontSize();
    }, [updateFontSize, value]);

    useEffect(() => {
        window.addEventListener('resize', () => updateFontSize());
        return window.removeEventListener('resize', () => updateFontSize());
    }, [updateFontSize]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (Number(newValue) <= max) {
            onChange?.(e);
        } else {
            e.target.value = value.toString();
        }
    };

    return (
        <div className="absolute inset-x-0 bottom-1 z-40">
            <div className="flex justify-center px-1 pb-2">
                <div ref={containerRef} className="w-3/4">
                    <input
                        ref={inputRef}
                        type="number"
                        value={Number(value).toString()}
                        onChange={handleChange}
                        className={
                            className +
                            ' w-full cookie-run-font text-outline-sm text-white text-center appearance-none leading-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all duration-200 on-focus'
                        }
                        style={{
                            fontSize: `${fontSize}px`,
                        }}
                        min={min}
                        max={max}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </div>
        </div>
    );
};
