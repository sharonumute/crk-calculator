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
import { yellowButton_left, yellowButton_middle, yellowButton_right } from '@/assets/images/buttons/YellowButton';

type StyledButtonVariant = 'BrightBlueButton' | 'BlueButtonDefault' | 'YellowButton';

type StyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?: StyledButtonVariant;
    innerClassName?: string;
};

export const StyledButton = ({
    label,
    onClick,
    className = '',
    variant = 'BlueButtonDefault',
    innerClassName = '',
    ...props
}: StyledButtonProps) => {
    const aggClassName =
        'relative inline-flex items-center justify-center transition-all bg-transparent border-0 p-0 m-0 cookie-run-font font-bold text-outline-sm duration-75 hover:scale-105 active:scale-95 ' +
        className;

    const buttonParts = [blueDefaultButton_left, blueDefaultButton_middle, blueDefaultButton_right];

    switch (variant) {
        case 'BrightBlueButton':
            buttonParts[0] = brightBlueButton_left;
            buttonParts[1] = brightBlueButton_middle;
            buttonParts[2] = brightBlueButton_right;
            break;
        case 'YellowButton':
            buttonParts[0] = yellowButton_left;
            buttonParts[1] = yellowButton_middle;
            buttonParts[2] = yellowButton_right;
            break;
        case 'BlueButtonDefault':
        default:
            break;
    }

    return (
        <button onClick={onClick} className={aggClassName} {...props}>
            <div className="relative inline-flex items-stretch cursor-pointer group w-full h-full">
                <div className={'relative py-2 px-8 w-full h-full ' + innerClassName}>
                    <span className="relative text-white drop-shadow z-10 w-full h-full flex items-center justify-center">
                        {label}
                    </span>
                    <div className="absolute inset-0 flex items-stretch">
                        <img
                            src={buttonParts[0]}
                            className="h-full w-auto rounded-l-lg object-cover flex-shrink-0"
                            alt=""
                        />
                        <img src={buttonParts[1]} className="h-full w-full -mx-1" alt="" />
                        <img
                            src={buttonParts[2]}
                            className="h-full w-auto rounded-r-lg object-cover flex-shrink-0"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </button>
    );
};
