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
import { redButton_left, redButton_middle, redButton_right } from '@/assets/images/buttons/RedButton';

type StyledButtonVariant = 'BrightBlueButton' | 'BlueButtonDefault' | 'YellowButton' | 'RedButton';

type StyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    variant?: StyledButtonVariant;
    innerClassName?: string;
};

export const StyledButton = ({
    label,
    className = '',
    variant = 'BlueButtonDefault',
    innerClassName = '',
    ...props
}: StyledButtonProps) => {
    const buttonClassName =
        'relative inline-flex items-center justify-center transition-all cookie-run-font font-bold text-outline-sm duration-75 hover:scale-105 active:scale-95 ' +
        className;

    const buttonParts = getButtonParts(variant);

    return (
        <button className={buttonClassName} {...props}>
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

function getButtonParts(variant: StyledButtonVariant) {
    switch (variant) {
        case 'BrightBlueButton':
            return [brightBlueButton_left, brightBlueButton_middle, brightBlueButton_right];
        case 'YellowButton':
            return [yellowButton_left, yellowButton_middle, yellowButton_right];
        case 'RedButton':
            return [redButton_left, redButton_middle, redButton_right];
        case 'BlueButtonDefault':
        default:
            return [blueDefaultButton_left, blueDefaultButton_middle, blueDefaultButton_right];
    }
}
