import {
    blueDefaultControlBackground_left,
    blueDefaultControlBackground_middle,
    blueDefaultControlBackground_right,
} from '@/assets/images/backgrounds/BlueDefaultControlBackground';
import { down_arrow_filled } from '@/assets/images/icons';
import './shared.css';

type StyledSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
};

export const StyledSelect = ({ value, options, onChange, className, ...props }: StyledSelectProps) => (
    <div>
        <div className={className + ' relative'}>
            <div className="absolute inset-0 flex pointer-events-none">
                <img src={blueDefaultControlBackground_left} className="rounded-l-lg flex-shrink-0 relative" />
                <img src={blueDefaultControlBackground_middle} className="flex-grow" />
                <img src={blueDefaultControlBackground_right} className="rounded-r-lg flex-shrink-0 relative" />
            </div>

            <select
                value={value}
                onChange={onChange}
                className="relative w-full h-full px-2 pr-10 pl-4 text-white appearance-none bg-transparent focus-visible:border-0 cookie-run-font text-outline-sm focus-visible:outline-0 translucent-options"
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={index}>
                        {option}
                    </option>
                ))}
            </select>

            <div
                className="absolute right-2 top-1/2 w-4 h-4 -mt-2 pointer-events-none bg-no-repeat bg-center bg-contain"
                style={{ backgroundImage: `url(${down_arrow_filled})` }}
            />
        </div>
    </div>
);
