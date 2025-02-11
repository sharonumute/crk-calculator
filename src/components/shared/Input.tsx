type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.RefObject<HTMLInputElement | null>;
};

export const Input = (props: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (props.type === 'number' && props.max) {
            if (Number(newValue) <= Number(props.max)) {
                props.onChange?.(e);
            } else {
                e.target.value = props.value?.toString() || '0';
            }
        }
    };

    return (
        <input
            {...props}
            onChange={handleChange}
            value={props.type == 'number' ? Number(props.value).toString() : props.value}
        />
    );
};
