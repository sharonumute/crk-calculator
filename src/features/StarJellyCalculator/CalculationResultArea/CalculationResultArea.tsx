import { CalculationResult } from '@/features/StarJellyCalculator/types';
import { JellyResult } from './JellyResult';
import './CalculationResultArea.css';
import { gnome_empty } from '@/assets/images/icons';
import { BonusButton } from './BonusButton';

interface CalculationResultAreaProps {
    calculationResults: CalculationResult[];
    totalEffectiveMultiplier: number;
}

export const CalculationResultArea = ({ calculationResults, totalEffectiveMultiplier }: CalculationResultAreaProps) => {
    return calculationResults.length > 0 ? (
        <div className="relative">
            <BonusButton value={totalEffectiveMultiplier} />
            <div
                className="grid grid-cols-4 gap-y-3 gap-x-[4%] calculation-area rounded-3xl p-3"
                aria-label="Calculation Results:"
            >
                {calculationResults.map((result, index) => (
                    <JellyResult key={index} calculationResult={result} />
                ))}
            </div>
        </div>
    ) : (
        <div className="flex calculation-area rounded-3xl p-2 h-30 items-center justify-center">
            <img src={gnome_empty} alt="No Calculation Results" className="relative scale-40 opacity-50" />
        </div>
    );
};
