type StyledSelectProps = {
    label: string;
    value: string | number;
    options: string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const StyledSelect = (props: StyledSelectProps) => (
    <div>
        <label className="block text-sm font-medium mb-1 text-white">{props.label}</label>
        <select value={props.value} onChange={props.onChange} className="w-full p-2 border rounded text-white">
            {props.options.map((option, index) => (
                <option key={index} value={index}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);
