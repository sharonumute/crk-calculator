import { hot_time_big, info_gray_circle } from '@/assets/images/icons';
import { AdaptiveTooltip } from '@/components/shared/AdaptiveTooltip';
import { StyledInput } from '@/components/shared/StyledInput';
import { StyledSelect } from '@/components/shared/StyledSelect';

interface BonusControlRowProps {
    labUpgradeLevel: number;
    burningTimePercent: number;
    onLabUpgradeLevelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBurningTimePercentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BonusControlRow = ({
    labUpgradeLevel,
    onLabUpgradeLevelChange,
    burningTimePercent,
    onBurningTimePercentChange,
}: BonusControlRowProps) => {
    const tooltip = (
        <div className="flex flex-col justify-center items-center">
            <p className="cookie-run-font">"Tastier Jellies" Lab Upgrade Level</p>
            <p className="cookie-run-font">Burning Time Amount</p>
        </div>
    );

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-1">
            <StyledSelect
                value={labUpgradeLevel}
                onChange={onLabUpgradeLevelChange}
                className="h-7 text-xs"
                options={[
                    'No Lab Upgrade',
                    'Level 1 (+1%)',
                    'Level 2 (+3%)',
                    'Level 3 (+5%)',
                    'Level 4 (+7%)',
                    'Level 5 (+10%)',
                ]}
                aria-label="Select lab upgrade level"
            />

            <AdaptiveTooltip content={tooltip}>
                <img src={info_gray_circle} className="h-7 py-1" aria-label="More Info" />
            </AdaptiveTooltip>

            <StyledInput
                type="number"
                value={burningTimePercent}
                onChange={onBurningTimePercentChange}
                min={0}
                max={100}
                subtitle={<img src={hot_time_big} className="opacity-50" />}
                className="h-7"
                aria-label="Enter burning time percent"
            />
        </div>
    );
};
