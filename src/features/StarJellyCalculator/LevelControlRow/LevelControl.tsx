import { AutoWidthInput } from '@/components/shared/AutoWidthInput';

type LevelControlProps = {
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    ariaLabel?: string;
};

export const LevelControl = (props: LevelControlProps) => {
    return (
        <div className={'relative w-fit'} aria-label={props.ariaLabel}>
            <div className="relative flex flex-row cookie-run-font font-bold text-3xl">
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
