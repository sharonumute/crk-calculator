import { StarJelly } from '@/features/StarJellyCalculator/types';
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
import { checkbox_off, checkbox_on, edit } from '@/assets/images/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useElementSize } from '@/hooks/useElementSize';
import { AutoScalingInput } from '@/components/shared/AutoScalingInput';
import { commonRarityPanel, epicRarityPanel, rareRarityPanel } from '@/assets/images/backgrounds';
import { useJellyScaling } from '@/hooks/useJellyScaling';

type JellyControlProps = {
    jelly: StarJelly;
    onSelect?: () => void;
    onCountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const jelly_images = [expJelly_1, expJelly_2, expJelly_3, expJelly_4, expJelly_5, expJelly_6, expJelly_7, expJelly_8];

export const JellyControl = (props: JellyControlProps) => {
    const [containerRef, size] = useElementSize<HTMLButtonElement>();
    const scaleAndTranslate = useJellyScaling(props.jelly.level);

    return (
        <div className="flex flex-col items-center gap-0.5">
            <button
                ref={containerRef}
                onClick={props.onSelect}
                className={`relative w-full h-full aspect-square max-w-32 max-h-32 duration-75 hover:scale-105 active:scale-95 cursor-pointer ${
                    !props.jelly.selected ? 'brightness-50' : ''
                }`}
            >
                <div className="relative w-full h-full">
                    <img
                        src={useJellyRarity(props.jelly.level)}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 z-30 flex items-center justify-center">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img
                                        src={jelly_images[props.jelly.level - 1]}
                                        alt={`Jelly level ${props.jelly.level}`}
                                        className={`w-3/4 h-3/4 object-contain ${scaleAndTranslate}`}
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

                    <div className="absolute top-2 left-2 z-40 w-1/4 h-1/4">
                        {props.jelly.selected ? (
                            <img src={checkbox_on} alt="Jelly selected" />
                        ) : (
                            <img src={checkbox_off} alt="Jelly unselected" />
                        )}
                    </div>

                    <img src={edit} alt="Editable" className="absolute w-1/4 h-1/4 z-40 right-2 top-2" />
                </div>

                <AutoScalingInput
                    value={props.jelly.count || 0}
                    onChange={props.onCountChange}
                    min={0}
                    max={MAX_JELLIES}
                    baseFontSize={0.25 * size.width}
                    minFontSize={(0.25 * size.width) / 2}
                />
            </button>
        </div>
    );
};

const useJellyRarity = (jellyLevel: number) => {
    switch (jellyLevel) {
        case 1:
        case 2:
            return commonRarityPanel;
        case 3:
        case 4:
        case 5:
            return rareRarityPanel;
        default:
            return epicRarityPanel;
    }
};
