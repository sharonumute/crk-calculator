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
        <div className="grid grid-cols-[1fr_auto_1fr] scale-75">
            <div className="flex justify-end pt-0.5">
                <LevelControl
                    value={props.currentLevel}
                    onChange={props.onCurrentLevelChange}
                    className="text-gray-600"
                    ariaLabel={`Current Level: ${props.currentLevel}. Editable`}
                />
            </div>
            <div className="flex justify-center items-center">
                <img src={arrow_progress} className="arrow_progress_green scale-75" />
            </div>
            <div className="flex justify-start pt-0.5">
                <LevelControl
                    value={props.targetLevel}
                    onChange={props.onTargetLevelChange}
                    className="text-green-500"
                    aria-label={`Target Level: ${props.targetLevel}. Editable`}
                    showEditable={true}
                />
            </div>
        </div>
    );
};
