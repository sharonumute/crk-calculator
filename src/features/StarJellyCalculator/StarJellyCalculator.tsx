import { useState, useCallback, useEffect } from 'react';
import { CalculationResult, EXP_GIVEN_ROW, EXP_REQUIREMENT_ROW, StarJelly } from './types';
import { JellyControlGrid } from './JellyControlGrid/JellyControlGrid';
import { StyledButton } from '@/components/shared/StyledButton';
import { labBonusPercentages, MAX_JELLIES } from './consts';
import { useWindowSize } from '@/hooks/useWindowSize';
import starJelliesDataRaw from '@/assets/data/required_star_jellies_per_level.csv?raw';
import expGivenDataRaw from '@/assets/data/exp_given_by_jellies.csv?raw';
import Papa from 'papaparse';
import { LevelControlRow } from './LevelControlRow/LevelControlRow';
import { PanelHeader } from '@/components/shared/PanelHeader';
import { PanelFooter } from '@/components/shared/PanelFooter';
import { CalculationResultArea } from './CalculationResultArea/CalculationResultArea';
import { ExpProgressBar } from './ExpProgressBar/ExpProgressBar';
import BonusButton from './BonusButton/BonusButton';
import { StyledSelect } from '@/components/shared/StyledSelect';
import { StyledInput } from '@/components/shared/StyledInput';

const EXP_REQUIREMENTS = Papa.parse<EXP_REQUIREMENT_ROW>(starJelliesDataRaw, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
}).data;

const JELLY_EXP_VALUES = Papa.parse<EXP_GIVEN_ROW>(expGivenDataRaw, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
}).data;

export const StarJellyCalculator = () => {
    const isMobile = useWindowSize();
    const [currentLevel, setCurrentLevel] = useState(1);
    const [targetLevel, setTargetLevel] = useState(70);
    const [errorMessage, setErrorMessage] = useState('');
    const [calculationResults, setCalculationResults] = useState<CalculationResult[]>([]);
    const [labUpgradeLevel, setLabUpgradeLevel] = useState(0);
    const [burningTimePercent, setBurningTimePercent] = useState(0);

    const calculateEffectiveJellyExp = useCallback(
        (baseExp: number) => {
            const labBonus = 1 + labBonusPercentages[labUpgradeLevel];
            const burningBonus = 1 + burningTimePercent / 100;

            return Math.round(baseExp * labBonus * burningBonus);
        },
        [burningTimePercent, labUpgradeLevel]
    );

    const [availableJellies, setAvailableJellies] = useState<StarJelly[]>(
        JELLY_EXP_VALUES.map((row) => ({
            level: row.Level,
            baseExp: row.Base,
            effectiveExp: calculateEffectiveJellyExp(row.Base),
            count: MAX_JELLIES,
            selected: true,
        })).filter((jelly) => !isNaN(jelly.level) && !isNaN(jelly.baseExp))
    );

    useEffect(() => {
        setAvailableJellies((prevJellies) =>
            prevJellies.map((jelly) => ({
                ...jelly,
                effectiveExp: calculateEffectiveJellyExp(jelly.baseExp),
            }))
        );
    }, [calculateEffectiveJellyExp]);

    const calculateRequiredExp = (current: number, target: number): number => {
        return EXP_REQUIREMENTS.filter((req) => req.Level > current && req.Level <= target).reduce(
            (sum, req) => sum + req.XP,
            0
        );
    };

    const calculateOptimalJellyUsage = () => {
        const totalExpNeeded = calculateRequiredExp(currentLevel, targetLevel);

        let remainingExp = totalExpNeeded;
        const result: CalculationResult[] = [];

        // Sort jellies by level (use lower level jellies first)
        const sortedJellies = [...availableJellies]
            .filter((jelly) => jelly.selected) // Only use selected jellies
            .sort((a, b) => a.level - b.level);

        for (const jelly of sortedJellies) {
            if (remainingExp <= 0) break;

            const jelliesNeeded = Math.min(Math.ceil(remainingExp / jelly.effectiveExp), jelly.count || 0);

            if (jelliesNeeded > 0) {
                result.push({
                    jelly: jelly,
                    count: jelliesNeeded,
                    expProvided: jelliesNeeded * jelly.effectiveExp,
                });
                remainingExp -= jelliesNeeded * jelly.effectiveExp;
            }
        }

        setCalculationResults(result);

        if (remainingExp > 0) {
            setErrorMessage(
                `You need ${remainingExp.toLocaleString()} more EXP to reach the target level. Current jellies are insufficient.`
            );
        } else {
            setErrorMessage('');
        }
    };

    const calculateProvidedExp = () => {
        return calculationResults.reduce((sum, result) => sum + result.expProvided, 0);
    };

    return (
        <div className="w-full rounded-3xl shadow-sm border-transparent flex flex-col">
            <PanelHeader className="w-full h-11">
                <h1 className="flex items-center justify-center text-white drop-shadow cookie-run-font font-bold text-lg text-outline-sm pt-1 tracking-wider h-full">
                    Star Jelly Calculator
                </h1>
            </PanelHeader>
            <div className="card-content inner-border border-3 border-black p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-2">
                            <LevelControlRow
                                currentLevel={currentLevel}
                                targetLevel={targetLevel}
                                onCurrentLevelChange={(e) => setCurrentLevel(Number(e.target.value))}
                                onTargetLevelChange={(e) => setTargetLevel(Number(e.target.value))}
                            />
                            <ExpProgressBar
                                totalExpProvided={calculateProvidedExp()}
                                totalExpRequired={calculateRequiredExp(currentLevel, targetLevel)}
                            />
                            <div className="grid grid-cols-2 gap-1">
                                <StyledSelect
                                    value={labUpgradeLevel}
                                    onChange={(e) => setLabUpgradeLevel(Number(e.target.value))}
                                    className="h-7"
                                    options={[
                                        'No Lab Upgrade',
                                        'Level 1 (+1%)',
                                        'Level 2 (+3%)',
                                        'Level 3 (+5%)',
                                        'Level 4 (+7%)',
                                        'Level 5 (+10%)',
                                    ]}
                                />
                                <StyledInput
                                    type="number"
                                    value={burningTimePercent}
                                    onChange={(e) => setBurningTimePercent(Number(e.target.value))}
                                    min={0}
                                    max={100}
                                />
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errorMessage}
                            </div>
                        )}

                        <BonusButton
                            burningTimePercent={burningTimePercent}
                            labUpgradeLevel={labUpgradeLevel}
                            onBurningTimePercentChange={(e) => setBurningTimePercent(Number(e.target.value))}
                            onLabUpgradeLevelChange={(e) => setLabUpgradeLevel(Number(e.target.value))}
                        >
                            <CalculationResultArea calculationResults={calculationResults} />
                        </BonusButton>
                    </div>

                    <div className={isMobile ? 'flex justify-center w-full' : 'w-full'}>
                        <JellyControlGrid
                            availableJellies={availableJellies}
                            setAvailableJellies={setAvailableJellies}
                        />
                    </div>
                </div>
            </div>

            <PanelFooter className="w-full h-20">
                <StyledButton label="CALCULATE" onClick={calculateOptimalJellyUsage} variant="BrightBlueButton" />
            </PanelFooter>
        </div>
    );
};
