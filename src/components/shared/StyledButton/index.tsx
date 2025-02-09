import { blueDefaultButton_Part1, blueDefaultButton_Part2, blueDefaultButton_Part3 } from '@/assets/images/buttons';
import './Button.css';

type StyledButtonProps = {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
};

export const StyledButton = (props: StyledButtonProps) => {
    const className =
        'w-full relative inline-flex items-center justify-center transition-all bg-transparent border-0 p-0 duration-75 hover:scale-105 active:scale-95 m-0 ' +
        props.className;

    return (
        <button onClick={props.onClick} className={className}>
            <div className="w-full relative h-16 flex items-stretch cursor-pointer group">
                <img src={blueDefaultButton_Part1} className="rounded-l-lg flex-shrink-0 relative z-10" />
                <img src={blueDefaultButton_Part2} className="flex-grow -mx-018" />
                <img src={blueDefaultButton_Part3} className="rounded-r-lg flex-shrink-0 relative z-10" />
                <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow cookie-run-font font-bold text-3xl text-outline">
                    {props.label}
                </span>
            </div>
        </button>
    );
};
