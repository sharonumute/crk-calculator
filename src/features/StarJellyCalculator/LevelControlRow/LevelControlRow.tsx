import { arrow_progress } from '@/assets/images/icons';
import { LevelControl } from './LevelControl';
import './LevelControlRow.css';

type LevelControlRowProps = {
    currentLevel: number;
    targetLevel: number;
    onCurrentLevelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTargetLevelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

export const LevelControlRow = (props: LevelControlRowProps) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <LevelControl value={props.currentLevel} onChange={props.onCurrentLevelChange} />
            <img src={arrow_progress} className="arrow_progress_green" />
            <LevelControl value={props.targetLevel} onChange={props.onTargetLevelChange} />
        </div>
    );
};
