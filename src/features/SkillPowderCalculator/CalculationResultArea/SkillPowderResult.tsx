import { commonRarityPanel, rareRarityPanel, epicRarityPanel } from '@/assets/images/backgrounds/RarityPanelBackground';
import { coin } from '@/assets/images/icons';
import { standardPowder, pristinePowder, refinedPowder } from '@/assets/images/skillPowder';

type SkillPowderVariant = 'Coin' | 'Standard' | 'Refined' | 'Pristine';
type SkillPowderResultProps = {
    variant: SkillPowderVariant;
    count: number;
};

export const SkillPowderResult = ({ variant = 'Standard', count }: SkillPowderResultProps) => {
    return (
        <div className="flex flex-col items-center justify-center w-1/5">
            <div className="relative w-full aspect-square">
                <div className="relative w-full h-full">
                    <img src={useSkillPowderRarity(variant)} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 z-30 flex items-center justify-center">
                        <img
                            src={useSkillPowderType(variant)}
                            alt={`${variant} Skill Powder`}
                            className={`w-3/4 h-3/4 object-contain`}
                        />
                    </div>
                </div>
            </div>
            <span className="cookie-run-font text-outline-sm text-base text-white leading-none">
                {count.toLocaleString()}
            </span>
        </div>
    );
};

const useSkillPowderRarity = (variant: SkillPowderVariant) => {
    switch (variant) {
        case 'Coin':
        case 'Standard':
            return commonRarityPanel;
        case 'Refined':
            return rareRarityPanel;
        case 'Pristine':
        default:
            return epicRarityPanel;
    }
};

const useSkillPowderType = (variant: SkillPowderVariant) => {
    switch (variant) {
        case 'Coin':
            return coin;
        case 'Standard':
            return standardPowder;
        case 'Refined':
            return refinedPowder;
        case 'Pristine':
        default:
            return pristinePowder;
    }
};
