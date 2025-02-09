import { StarJelly } from '@/features/StarJellyCalculator/types';
import { purpleSquareButton } from '@/assets/images/buttons';
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
import { MAX_JELLIES } from '@/features/StarJellyCalculator/consts';
import { checkbox_off, checkbox_on } from '@/assets/images/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AutoScalingInput } from '@/components/shared/AutoScalingInput';

type JellyControlProps = {
    jelly: StarJelly;
    onSelect?: () => void;
    onCountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const jelly_images = [expJelly_1, expJelly_2, expJelly_3, expJelly_4, expJelly_5, expJelly_6, expJelly_7, expJelly_8];

export const JellyControl = (props: JellyControlProps) => {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <button
                onClick={props.onSelect}
                className={`relative w-18 h-18 md:w-24 md:h-24 duration-75 hover:scale-105 active:scale-95 cursor-pointer ${
                    !props.jelly.selected ? 'brightness-50' : ''
                }`}
            >
                <div className="relative w-full h-full">
                    <img
                        src={purpleSquareButton}
                        alt="Background texture"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 z-30 flex items-center justify-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img
                                        src={jelly_images[props.jelly.level - 1]}
                                        alt="Jelly"
                                        className={`w-12 h-12 md:w-18 md:h-18 object-contain`}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="cookie-run-font">Level {props.jelly.level} Experience Jelly</p>
                                    <p className="cookie-run-font">Base Exp: {props.jelly.baseExp} XP</p>
                                    <p className="cookie-run-font">Effective Exp: {props.jelly.effectiveExp} XP</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="absolute top-2 left-2 z-40">
                        {props.jelly.selected ? (
                            <img src={checkbox_on} alt="Checkbox selected" className="w-6 h-6" />
                        ) : (
                            <img src={checkbox_off} alt="Checkbox unselected" className="w-6 h-6" />
                        )}
                    </div>
                </div>

                <AutoScalingInput
                    value={props.jelly.count || 0}
                    onChange={props.onCountChange}
                    min={0}
                    max={MAX_JELLIES}
                />
            </button>
        </div>
    );
};
