import { empty_gnome } from '@/assets/images/icons';
import { CalculationResult } from '../types';
import { BonusButton } from './BonusButton';
import { JellyResult } from './JellyResult';

type CalculationResultAreaProps = {
    calculationResults: CalculationResult[];
    totalEffectiveMultiplier: number;
};

export const CalculationResultArea = ({ calculationResults, totalEffectiveMultiplier }: CalculationResultAreaProps) => {
    return calculationResults.length > 0 ? (
        <div className="relative">
            <BonusButton value={totalEffectiveMultiplier} />
            <div
                className="grid grid-cols-4 gap-y-3 gap-x-[4%] bg-[#cfc1b6] border-3 border-white rounded-3xl px-3 pb-3 pt-2"
                aria-label="Calculation Results:"
            >
                {calculationResults.map((result, index) => (
                    <JellyResult key={index} calculationResult={result} />
                ))}
            </div>
        </div>
    ) : (
        <div className="flex bg-[#cfc1b6] border-3 border-white rounded-3xl p-2 h-30 items-center justify-center">
            <img src={empty_gnome} alt="No Calculation Results" className="relative scale-40 opacity-50" />
        </div>
    );
};
