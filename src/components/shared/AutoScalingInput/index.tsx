import { useWindowSize } from '@/hooks/useWindowSize';
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface AutoScalingInputProps {
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
    className?: string;
}

export const AutoScalingInput: React.FC<AutoScalingInputProps> = ({
    value,
    onChange,
    min,
    max,
    className = '',
}) => {
    const [fontSize, setFontSize] = useState(16);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useWindowSize();

    const updateFontSize = useCallback(() => {
        const input = inputRef.current;
        const container = containerRef.current;

        if (!input || !container) return;

        const baseSize = isMobile ? 16 : 24;
        const minSize = isMobile ? 8 : 12;

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

        const containerWidth = container.clientWidth - 16; // Adjust for m-2 margin

        if (textWidth > containerWidth) {
            const newFontSize = (containerWidth / textWidth) * baseSize;
            setFontSize(Math.max(minSize, newFontSize));
        } else {
            setFontSize(baseSize);
        }
    }, [isMobile, value]);

    useEffect(() => {
        updateFontSize();
    }, [updateFontSize, value]);

    return (
        <div className="absolute inset-x-0 bottom-1 z-40">
            <div className="flex justify-center px-1">
                <div ref={containerRef} className="w-16 md:w-20 m-1 md:m-2">
                    <input
                        ref={inputRef}
                        type="number"
                        value={Number(value).toString()}
                        onChange={onChange}
                        className={
                            'w-16 md:w-20 h-6 cookie-run-font text-outline-sm text-white text-center appearance-none leading-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all duration-200' +
                            className
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
