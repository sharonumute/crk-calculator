import { CalculationResult } from '@/features/StarJellyCalculator/types';
import {
    expJelly_1,
    expJelly_2,
    expJelly_3,
    expJelly_4,
    expJelly_5,
    expJelly_6,
    expJelly_7,
    expJelly_8,
} from '@/assets/images/jellies';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type JellyResultProps = {
    calculationResult: CalculationResult;
};

const jelly_images = [expJelly_1, expJelly_2, expJelly_3, expJelly_4, expJelly_5, expJelly_6, expJelly_7, expJelly_8];

export const JellyResult = ({ calculationResult }: JellyResultProps) => {
    const scaleAndTranslate = () => {
        switch (calculationResult.jelly.level) {
            case 1:
                return 'scale-75';
            case 2:
                return 'scale-90';
            case 3:
                return 'scale-110 translate-y-1';
            default:
                return 'scale-100';
        }
    };

    const bonusActive = calculationResult.jelly.effectiveExp != calculationResult.jelly.baseExp;
    const effectiveExpColor = bonusActive ? 'text-red-200' : 'text-white';
    return (
        <div
            className="relative min-w-16 aspect-square m-1"
            aria-label={`${calculationResult.count} Level ${calculationResult.jelly.level} jellies`}
        >
            <div className="flex relative cookie-run-font text-xs text-white text-outline-sm items-center justify-center bg-black/25 rounded-full mb-1.5">
                <span>EXP</span>
                <span className={effectiveExpColor}>&nbsp;{calculationResult.jelly.effectiveExp}</span>
            </div>
            <p className="absolute z-10 cookie-run-font text-white text-outline-sm left-1/2 -translate-x-1/2 -bottom-1.5">
                {calculationResult.count}
            </p>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <img
                            src={jelly_images[calculationResult.jelly.level - 1]}
                            alt={`Jelly level ${calculationResult.jelly.level}`}
                            className={`relative w-full h-full object-contain ${scaleAndTranslate()}`}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="cookie-run-font">{calculationResult.expProvided} Experience total</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
