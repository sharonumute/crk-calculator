import { arrow_progress, edit } from '@/assets/images/icons';
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
            <img src={edit} alt="Editable" className="absolute w-5 right-8 z-10" />
            <div className="flex justify-end pt-0.5">
                <LevelControl
                    value={props.currentLevel}
                    onChange={props.onCurrentLevelChange}
                    className="text-gray-600"
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
                />
            </div>
        </div>
    );
};
