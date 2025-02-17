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
import { CalculationResult } from '../types';
import { useJellyScaling } from '../useJellyScaling';

type JellyResultProps = {
    calculationResult: CalculationResult;
};

const jelly_images = [expJelly_1, expJelly_2, expJelly_3, expJelly_4, expJelly_5, expJelly_6, expJelly_7, expJelly_8];

export const JellyResult = ({ calculationResult }: JellyResultProps) => {
    const scaleAndTranslate = useJellyScaling(calculationResult.jelly.level);

    const bonusActive = calculationResult.jelly.effectiveExp != calculationResult.jelly.baseExp;
    const effectiveExpColor = bonusActive ? 'text-red-200' : 'text-white';
    return (
        <div
            className="relative min-w-16 aspect-square m-1 flex flex-col items-center justify-center"
            aria-label={`${calculationResult.count} Level ${calculationResult.jelly.level} jellies`}
        >
            <div className="flex w-full relative cookie-run-font text-xs text-white text-outline-sm items-center justify-center bg-black/25 rounded-full mb-0.5">
                <span>EXP</span>
                <span className={effectiveExpColor}>&nbsp;{calculationResult.jelly.effectiveExp.toLocaleString()}</span>
            </div>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <img
                            src={jelly_images[calculationResult.jelly.level - 1]}
                            alt={`Jelly level ${calculationResult.jelly.level}`}
                            className={`w-3/4 h-3/4 object-contain ${scaleAndTranslate}`}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="cookie-run-font">
                            {calculationResult.expProvided.toLocaleString()} Experience total
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <p className="absolute sm:text-2xl z-10 cookie-run-font text-white text-outline-sm left-1/2 -translate-x-1/2 -bottom-1.5">
                {calculationResult.count.toLocaleString()}
            </p>
        </div>
    );
};
