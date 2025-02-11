import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/shared/Input';

type AutoWidthInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const AutoWidthInput = ({ value, onChange, className, placeholder, style, ...props }: AutoWidthInputProps) => {
    const [innerValue, setInnerValue] = useState(value || '');
    const [width, setWidth] = useState(20);
    const hiddenText = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInnerValue(value || '');
    }, [value]);

    useEffect(() => {
        if (hiddenText.current) {
            const newWidth = Math.max(20, hiddenText.current.offsetWidth);
            setWidth(newWidth);
        }
    }, [innerValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInnerValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="relative inline-block">
            <div
                ref={hiddenText}
                className="absolute invisible whitespace-pre "
                style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
            >
                {innerValue || placeholder || ''}
            </div>

            <Input
                {...props}
                value={innerValue}
                onChange={handleChange}
                className={`${className}`}
                style={{
                    ...style,
                    width: `${width + 4}px`,
                }}
            />
        </div>
    );
};
