import { empty_gnome } from '@/assets/images/icons';
import { CalculationResults } from '../types';
import { SkillPowderResult } from './SkillPowderResult';
import './CalculationResultArea.css';

type CalculationResultAreaProps = {
    calculationResults: CalculationResults;
};

export const CalculationResultArea = ({ calculationResults }: CalculationResultAreaProps) => {
    return (
        <div className="flex flex-col calculation-area border-3 border-white rounded-3xl overflow-hidden">
            <div className="w-full calculation-header py-1">
                <h2 className="cookie-run-font text-outline-sm text-white text-center text-base">Materials</h2>
            </div>
            {calculationResults.coins > 0 ? (
                <div
                    className="flex flex-row flex-wrap items-center justify-center gap-2 p-2"
                    aria-label="Calculation Results:"
                >
                    {calculationResults.coins > 0 && (
                        <SkillPowderResult variant="Coin" count={calculationResults.coins} />
                    )}
                    {calculationResults.standardPowder > 0 && (
                        <SkillPowderResult variant="Standard" count={calculationResults.standardPowder} />
                    )}
                    {calculationResults.refinedPowder > 0 && (
                        <SkillPowderResult variant="Refined" count={calculationResults.refinedPowder} />
                    )}
                    {calculationResults.pristinePowder > 0 && (
                        <SkillPowderResult variant="Pristine" count={calculationResults.pristinePowder} />
                    )}
                </div>
            ) : (
                <div className="flex p-2 h-30 items-center justify-center">
                    <img src={empty_gnome} alt="No Calculation Results" className="relative scale-40 opacity-50" />
                </div>
            )}
        </div>
    );
};
