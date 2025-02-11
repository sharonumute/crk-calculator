import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalculationResult, EXP_GIVEN_ROW, EXP_REQUIREMENT_ROW, StarJelly } from './types';
import { JellyControlGrid } from './JellyControlGrid/JellyControlGrid';
import { StyledInput } from '@/components/shared/StyledInput';
import { StyledSelect } from '@/components/shared/StyledSelect';
import { StyledButton } from '@/components/shared/StyledButton';
import { MAX_JELLIES } from './consts';
import { useWindowSize } from '@/hooks/useWindowSize';
import starJelliesDataRaw from '@/assets/data/required_star_jellies_per_level.csv?raw';
import expGivenDataRaw from '@/assets/data/exp_given_by_jellies.csv?raw';
import Papa from 'papaparse';
import { LevelControlRow } from './LevelControlRow/LevelControlRow';

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
    const [calculationResult, setCalculationResult] = useState<CalculationResult[]>([]);
    const [labUpgradeLevel, setLabUpgradeLevel] = useState(0);
    const [burningTimePercent, setBurningTimePercent] = useState(0);
    const [totalExpRequired, setTotalExpRequired] = useState(0);

    const calculateEffectiveJellyExp = useCallback(
        (baseExp: number) => {
            // Lab upgrade bonuses: 0%, 1%, 3%, 5%, 7%, 10%
            const labBonusPercentages = [0, 0.01, 0.03, 0.05, 0.07, 0.1];
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
        setTotalExpRequired(totalExpNeeded);

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
                    jellyType: jelly.level,
                    count: jelliesNeeded,
                    expProvided: jelliesNeeded * jelly.effectiveExp,
                });
                remainingExp -= jelliesNeeded * jelly.effectiveExp;
            }
        }

        setCalculationResult(result);

        if (remainingExp > 0) {
            setErrorMessage(
                `You need ${remainingExp.toLocaleString()} more EXP to reach the target level. Current jellies are insufficient.`
            );
        } else {
            setErrorMessage('');
        }
    };

    const jellyControlGrid = (
        <div className={isMobile ? 'flex justify-center w-full' : 'w-full'}>
            <JellyControlGrid availableJellies={availableJellies} setAvailableJellies={setAvailableJellies} />
        </div>
    );

    return (
        <div className="w-full p-4">
            <Card className="bg-slate-900">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">Star Jelly Calculator</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <LevelControlRow
                                    currentLevel={currentLevel}
                                    targetLevel={targetLevel}
                                    onCurrentLevelChange={(e) => setCurrentLevel(Number(e.target.value))}
                                    onTargetLevelChange={(e) => setTargetLevel(Number(e.target.value))}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-end">
                                <StyledSelect
                                    label="Lab Upgrade Level (1-5)"
                                    value={labUpgradeLevel}
                                    onChange={(e) => setLabUpgradeLevel(Number(e.target.value))}
                                    options={[
                                        'No Upgrade',
                                        'Level 1 (+1%)',
                                        'Level 2 (+3%)',
                                        'Level 3 (+5%)',
                                        'Level 4 (+7%)',
                                        'Level 5 (+10%)',
                                    ]}
                                />

                                <StyledInput
                                    label="Burning Time Bonus (%)"
                                    type="number"
                                    value={burningTimePercent}
                                    onChange={(e) => setBurningTimePercent(Number(e.target.value))}
                                    min="0"
                                    max="100"
                                />
                            </div>

                            {isMobile && jellyControlGrid}

                            <StyledButton label="CALCULATE" onClick={calculateOptimalJellyUsage} />

                            {errorMessage && (
                                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {errorMessage}
                                </div>
                            )}

                            {calculationResult.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Required Star Jellies</h3>
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded mb-4">
                                        <span className="font-medium">Total EXP Required: </span>
                                        {totalExpRequired.toLocaleString()} EXP
                                    </div>
                                    <div className="space-y-2">
                                        {calculationResult.map((result, index) => (
                                            <div
                                                key={index}
                                                className="p-2 border rounded flex justify-between text-white"
                                            >
                                                <span>Level {result.jellyType} Star Jellies:</span>
                                                <span className="font-medium">
                                                    {result.count.toLocaleString()} (
                                                    {result.expProvided.toLocaleString()} EXP)
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isMobile && jellyControlGrid}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
