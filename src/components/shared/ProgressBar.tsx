import {
    yellowProgressBarBackground_middle,
    yellowProgressBarBackground_right,
    yellowProgressBarFill_middle,
    yellowProgressBarFill_right,
} from '@/assets/images/backgrounds/YellowProgressBar';

interface ProgressBarProps {
    progress: number;
    className?: string;
    children?: React.ReactNode;
}

export const ProgressBar = ({ progress = 50, className = '', children }: ProgressBarProps) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className={'relative inline-block rounded-full overflow-hidden w-full ' + className}>
            {/* Background layer */}
            <div className="w-full relative h-6 flex items-stretch">
                <img src={yellowProgressBarBackground_right} className="flex-shrink-0 relative scale-x-[-1]" />
                <img src={yellowProgressBarBackground_middle} className="flex-grow" />
                <img src={yellowProgressBarBackground_right} className="flex-shrink-0 relative" />
            </div>

            {/* Fill layer with dynamic middle section */}
            <div className="absolute top-0 left-0 h-full flex w-full">
                <div
                    className="flex items-stretch transition-all duration-300"
                    style={{ width: `${clampedProgress}%` }}
                >
                    <img src={yellowProgressBarFill_right} className="flex-shrink-0 relative scale-x-[-1]" />
                    <div className="flex-grow relative overflow-hidden">
                        <img src={yellowProgressBarFill_middle} className="w-full h-full" />
                    </div>
                    <img src={yellowProgressBarFill_right} className="flex-shrink-0 relative" />
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">{children}</div>
        </div>
    );
};
