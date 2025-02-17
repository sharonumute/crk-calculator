import { hot_time_balloon } from '@/assets/images/balloons';
import { hot_time_icon, hot_time_arrow } from '@/assets/images/icons';

export type BonusButtonProps = {
    value: number;
};

export const BonusButton = ({ value }: BonusButtonProps) => {
    return (
        <div className="relative">
            <div className="absolute -right-1.5 -top-2 z-30" aria-label={`Current efficency level: ${value}`}>
                {value === 0 ? null : (
                    <>
                        <img src={hot_time_balloon} className="w-18 h-8" />
                        <div className="absolute top-1 grid grid-cols-3 gap-1.5 items-center justify-items-center">
                            <img src={hot_time_icon} className="w-4" />
                            <p
                                className="cookie-run-font text-outline-sm text-yellow-300 text-sm h-4.5 pb-4"
                                aria-label="Total EXP efficiency being applied"
                            >
                                {value}%
                            </p>
                            <img src={hot_time_arrow} className="w-4" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
