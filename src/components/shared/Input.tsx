type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.RefObject<HTMLInputElement | null>;
};

export const Input = (props: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (props.type === 'number' && props.max) {
            if (Number(newValue) <= Number(props.max) && Number(newValue) >= Number(props.min)) {
                props.onChange?.(e);
            } else {
                e.target.value = props.value?.toString() || '0';
            }
        }
    };

    return (
        <>
            <style>
                {`
                    /* Remove spinner buttons for Firefox */
                    input[type="number"] {
                    -moz-appearance: textfield;
                    }
                    
                    /* Remove spinner buttons for Chrome, Safari, Edge, Opera */
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                    }
                `}
            </style>
            <input
                {...props}
                onChange={handleChange}
                value={props.type == 'number' ? Number(props.value).toString() : props.value}
            />
        </>
    );
};
