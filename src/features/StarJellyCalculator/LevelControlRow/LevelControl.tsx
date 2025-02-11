import { Input } from '@/components/shared/Input';

type LevelControlProps = {
    value: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

export const LevelControl = (props: LevelControlProps) => {
    return (
        <div>
            <Input
                type="number"
                value={props.value}
                onChange={props.onChange}
                className={props.className + ' text-white'}
                max={90}
                min={0}
            />
        </div>
    );
};
