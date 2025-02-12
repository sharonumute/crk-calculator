import { minus_blue_circle, plus_blue_circle } from '@/assets/images/icons';
import { Input } from './Input';
import { PanelBackground } from './PanelBackground';

interface CounterProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    max: number;
}

export const Counter = ({ value, onChange, max }: CounterProps) => {
    const createChangeEvent = (newValue: number): React.ChangeEvent<HTMLInputElement> => {
        const event = {
            target: {
                value: String(newValue),
                type: 'number',
                name: '',
            },
        } as React.ChangeEvent<HTMLInputElement>;

        return event;
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(createChangeEvent(value + 1));
        }
    };

    const handleDecrement = () => {
        if (value > 0) {
            onChange(createChangeEvent(value - 1));
        }
    };
    return (
        <PanelBackground variant="Black" className="pt-3 pb-5">
            <div className="relative w-full px-4">
                <button
                    onClick={handleDecrement}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 active:scale-95"
                >
                    <img src={minus_blue_circle} alt="Decrease" className="w-10 h-10" />
                </button>

                <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                    max={max}
                    className="w-full px-12 h-10 bg-black inner-border border-gray-700 border-1 cookie-run-font text-outline-sm text-xl text-white rounded-full focus-visible:outline-gray-700"
                />

                <button
                    onClick={handleIncrement}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 active:scale-95"
                >
                    <img src={plus_blue_circle} alt="Increase" className="w-10 h-10" />
                </button>
            </div>
        </PanelBackground>
    );
};
