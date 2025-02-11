import { CalculationResult } from '@/features/StarJellyCalculator/types';
import { JellyResult } from './JellyResult';
import { hot_time_balloon } from '@/assets/images/balloons';
import './CalculationResultArea.css';
import { hot_time_arrow, hot_time_icon } from '@/assets/images/icons';

type CalculationResultAreaProps = {
    calculationResults: CalculationResult[];
};

export const CalculationResultArea = ({ calculationResults }: CalculationResultAreaProps) => {
    const container =
        calculationResults.length > 0 ? (
            <div className="grid grid-cols-4 gap-y-4 calculation-area rounded-3xl p-2">
                {calculationResults.map((result, index) => (
                    <JellyResult key={index} calculationResult={result} />
                ))}
            </div>
        ) : (
            <div className="flex calculation-area rounded-3xl p-2 h-20 items-center justify-center">
                <p className="cookie-run-font text-white">Required Star Jellies</p>
            </div>
        );

    return (
        <div className="relative">
            <div className="absolute -right-1.5 -top-2 z-30">
                <img src={hot_time_balloon} className="w-18 h-8" />

                <div className="absolute top-1 right-1 flex flex-row items-center">
                    <img src={hot_time_icon} alt="Burning time bonus" className="w-4" />
                    <p className="cookie-run-font text-outline-sm text-yellow-300 text-sm">
                        {calculationResults[0] ? calculationResults[0].expEfficiency : 0}%
                    </p>
                    <img src={hot_time_arrow} className="w-4" />
                </div>
            </div>

            {container}
        </div>
    );
};
