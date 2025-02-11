type CandySliderProps = {
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    max: number;
};

export const CandySlider = (props: CandySliderProps) => {
    return (
        <div className="relative h-4 w-16 flex items-center my-auto">
            {/* White background */}
            <div className="absolute inset-0 h-1.5 my-auto rounded-sm bg-white" />

            {/* Striped progress */}
            <div
                className="absolute h-1.5 my-auto rounded-sm"
                style={{
                    background: `repeating-linear-gradient(
                            45deg,
                            #60a5fa,
                            #60a5fa 4px,
                            #ffffff 4px,
                            #ffffff 8px
                        )`,
                    width: `${(props.value / props.max) * 100}%`,
                    left: 0,
                }}
            />

            {/* Slider input */}
            <input
                type="range"
                min="0"
                max={props.max}
                value={props.value}
                onChange={props.onChange}
                className="absolute inset-0 appearance-none bg-transparent cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none 
                             [&::-webkit-slider-thumb]:h-3 
                             [&::-webkit-slider-thumb]:w-3
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-blue-500
                             [&::-webkit-slider-thumb]:border 
                             [&::-webkit-slider-thumb]:border-blue-600
                             [&::-webkit-slider-thumb]:shadow-sm
                             [&::-webkit-slider-thumb]:cursor-pointer"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};
