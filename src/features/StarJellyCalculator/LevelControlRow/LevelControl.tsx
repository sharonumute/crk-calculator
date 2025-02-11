import { AutoWidthInput } from '@/components/shared/AutoWidthInput';

type LevelControlProps = {
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

export const LevelControl = (props: LevelControlProps) => {
    return (
        <div className={'relative w-fit'}>
            <div className="relative flex flex-row cookie-run-font font-bold text-3xl">
                <p className={props.className}>Lv.</p>
                <AutoWidthInput
                    type="number"
                    value={props.value}
                    onChange={props.onChange}
                    className={props.className + ' border-1 border-gray-500 bg-white rounded opacity-90'}
                    max={90}
                    min={0}
                    style={{ height: 30 }}
                />
            </div>
        </div>
    );
};
