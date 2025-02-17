import skillPowderRaw from '@/assets/data/required_skill_powder_per_level.csv?raw';
import Papa from 'papaparse';
import { CalculationResults, SKILL_POWDER_ROW } from './types';
import { useState } from 'react';
import { PanelFooter } from '@/components/shared/PanelFooter';
import { PanelHeader, PanelHeaderText } from '@/components/shared/PanelHeader';
import { StyledButton } from '@/components/shared/StyledButton';
import { LevelControlRow } from '@/components/shared/LevelControlRow';
import { CalculationResultArea } from './CalculationResultArea/CalculationResultArea';

const SKILL_POWDER_VALUES = Papa.parse<SKILL_POWDER_ROW>(skillPowderRaw, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
}).data;

const emptyResults: CalculationResults = {
    coins: 0,
    standardPowder: 0,
    refinedPowder: 0,
    pristinePowder: 0,
};

export const SkillPowderCalculator = () => {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [targetLevel, setTargetLevel] = useState(1);
    const [calculationResults, setCalculationResults] = useState<CalculationResults>({
        coins: 0,
        standardPowder: 0,
        refinedPowder: 0,
        pristinePowder: 0,
    });

    const calculatePowderRequirements = () => {
        const relevantLevels = SKILL_POWDER_VALUES.filter(
            (row) => row.Level > currentLevel && row.Level <= targetLevel
        );

        const totals = relevantLevels.reduce(
            (acc, row) => ({
                coins: acc.coins + row.Coins,
                standardPowder: acc.standardPowder + (row.StandardPowder || 0),
                refinedPowder: acc.refinedPowder + (row.RefinedPowder || 0),
                pristinePowder: acc.pristinePowder + (row.PristinePowder || 0),
            }),
            emptyResults
        );

        setCalculationResults(totals);
    };

    return (
        <div className="rounded-3xl shadow-sm border-transparent flex flex-col container">
            <PanelHeader className="w-full h-11">
                <PanelHeaderText text="Skill Powder Calculator" />
            </PanelHeader>
            <div className="card-content inner-border border-3 border-black grid grid-cols-1 items-start py-2 px-4 pb-4">
                <LevelControlRow
                    currentLevel={currentLevel}
                    targetLevel={targetLevel}
                    onCurrentLevelChange={(e) => setCurrentLevel(Number(e.target.value))}
                    onTargetLevelChange={(e) => setTargetLevel(Number(e.target.value))}
                />
                <CalculationResultArea calculationResults={calculationResults} />
            </div>
            <PanelFooter className="w-full h-20">
                <StyledButton
                    label="CALCULATE"
                    onClick={calculatePowderRequirements}
                    variant="BrightBlueButton"
                    aria-label="Calculate Results"
                    className="text-xl w-3/4 h-14"
                />
            </PanelFooter>
        </div>
    );
};
