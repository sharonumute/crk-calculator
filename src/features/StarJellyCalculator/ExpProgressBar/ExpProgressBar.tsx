import { ProgressBar } from '@/components/shared/ProgressBar';

type ExpProgressBarProps = {
    totalExpRequired: number;
    totalExpProvided: number;
};

export const ExpProgressBar = ({ totalExpRequired, totalExpProvided }: ExpProgressBarProps) => {
    const percentage = totalExpProvided / totalExpRequired;
    const progress = percentage > 1 ? 1 : percentage < 0 ? 0 : percentage;
    return (
        <ProgressBar progress={progress * 100}>
            <span className="text-white drop-shadow cookie-run-font font-bold text-sm text-outline-sm">
                {totalExpProvided}/{totalExpRequired} EXP
            </span>
        </ProgressBar>
    );
};
