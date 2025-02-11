import {
    blueDefaultButton_left,
    blueDefaultButton_middle,
    blueDefaultButton_right,
    brightBlueButton_left,
    brightBlueButton_middle,
    brightBlueButton_right,
} from '@/assets/images/buttons';
import './shared.css';

type StyledButtonVariant = 'BrightBlueButton' | 'BlueButtonDefault';

type StyledButtonProps = {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?: StyledButtonVariant;
};

export const StyledButton = ({ label, onClick, className = '', variant = 'BlueButtonDefault' }: StyledButtonProps) => {
    const aggClassName =
        'w-full relative inline-flex items-center justify-center transition-all bg-transparent border-0 p-0 duration-75 hover:scale-105 active:scale-95 m-0 ' +
        className;

    const buttonParts = [blueDefaultButton_left, blueDefaultButton_middle, blueDefaultButton_right];

    switch (variant) {
        case 'BrightBlueButton':
            buttonParts[0] = brightBlueButton_left;
            buttonParts[1] = brightBlueButton_middle;
            buttonParts[2] = brightBlueButton_right;
            break;
        case 'BlueButtonDefault':
        default:
            break;
    }

    return (
        <button onClick={onClick} className={aggClassName}>
            <div className="w-full relative h-16 flex items-stretch cursor-pointer group">
                <img src={buttonParts[0]} className="rounded-l-lg flex-shrink-0 relative z-10" />
                <img src={buttonParts[1]} className="flex-grow -mx-018" />
                <img src={buttonParts[2]} className="rounded-r-lg flex-shrink-0 relative z-10" />
                <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow cookie-run-font font-bold text-3xl text-outline">
                    {label}
                </span>
            </div>
        </button>
    );
};
