import { Input } from '@/components/shared/Input';

type StyledInputProps = {
    type: React.HTMLInputTypeAttribute;
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: string | number;
    max: string | number;
};

export const StyledInput = (props: StyledInputProps) => (
    <div>
        <Input
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            className="w-full p-2 border rounded text-white"
            min={props.min}
            max={props.max}
        />
    </div>
);
