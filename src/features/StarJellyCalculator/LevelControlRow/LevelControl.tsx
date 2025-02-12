import { edit } from '@/assets/images/icons';
import { AutoWidthInput } from '@/components/shared/AutoWidthInput';

type LevelControlProps = {
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    ariaLabel?: string;
    showEditable?: boolean;
};

export const LevelControl = (props: LevelControlProps) => {
    return (
        <div className={'relative w-fit'} aria-label={props.ariaLabel}>
            <div className="relative flex flex-row cookie-run-font font-bold text-3xl">
                {props.showEditable && <img src={edit} alt="Editable" className="absolute w-4 -right-4 -top-1 z-10" />}
                <p className={props.className}>Lv.</p>
                <AutoWidthInput
                    type="number"
                    value={props.value}
                    onChange={props.onChange}
                    className={props.className}
                    max={90}
                    min={0}
                />
            </div>
        </div>
    );
};
