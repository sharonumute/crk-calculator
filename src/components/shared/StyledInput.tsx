import {
    whiteInputBackground_left,
    whiteInputBackground_middle,
    whiteInputBackground_right,
} from '@/assets/images/backgrounds';
import { Input } from '@/components/shared/Input';

type StyledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    subtitle?: React.ReactNode;
};

export const StyledInput = ({ className, subtitle, ...props }: StyledInputProps) => (
    <div>
        <div className={className + ' relative'}>
            <div className="absolute inset-0 flex justify-end z-10 right-1 h-3/4 top-1">{subtitle}</div>
            <div className="absolute inset-0 flex">
                <img src={whiteInputBackground_left} className="rounded-l-lg flex-shrink-0 relative" />
                <img src={whiteInputBackground_middle} className="flex-grow" />
                <img src={whiteInputBackground_right} className="rounded-r-lg flex-shrink-0 relative" />
            </div>

            <Input
                className="relative w-full h-full px-2 pr-10 pl-4 text-gray-500 appearance-none bg-transparent focus-visible:border-0 cookie-run-font focus-visible:outline-0 z-10"
                {...props}
            />
        </div>
    </div>
);
