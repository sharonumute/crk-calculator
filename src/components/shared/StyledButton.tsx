import {
    blueDefaultButton_left,
    blueDefaultButton_middle,
    blueDefaultButton_right,
} from '@/assets/images/buttons/BlueDefaultButton';
import {
    brightBlueButton_left,
    brightBlueButton_middle,
    brightBlueButton_right,
} from '@/assets/images/buttons/BrightBlueButton';
import './shared.css';

type StyledButtonVariant = 'BrightBlueButton' | 'BlueButtonDefault';

type StyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?: StyledButtonVariant;
};

export const StyledButton = ({
    label,
    onClick,
    className = '',
    variant = 'BlueButtonDefault',
    ...props
}: StyledButtonProps) => {
    const aggClassName =
        'relative inline-flex items-center justify-center transition-all bg-transparent border-0 p-0 duration-75 hover:scale-105 active:scale-95 m-0 cookie-run-font font-bold text-outline-sm ' +
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
        <button onClick={onClick} className={aggClassName} {...props}>
            <div className="w-full relative h-full flex items-stretch cursor-pointer group">
                <img src={buttonParts[0]} className="rounded-l-lg flex-shrink-0 relative" />
                <img src={buttonParts[1]} className="flex-grow -mx-0.18" />
                <img src={buttonParts[2]} className="rounded-r-lg flex-shrink-0 relative" />
                <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow  z-10">
                    {label}
                </span>
            </div>
        </button>
    );
};
