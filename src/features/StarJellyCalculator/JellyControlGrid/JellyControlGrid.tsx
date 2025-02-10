import { StarJelly } from '@/features/StarJellyCalculator/types';
import { JellyControl } from './JellyControl';

type JellyControlGridProps = {
    setAvailableJellies: (jellies: StarJelly[]) => void;
    availableJellies: StarJelly[];
};

export const JellyControlGrid = (props: JellyControlGridProps) => {
    return (
        <div className="block">
            <h3 className="text-lg font-semibold mb-2 text-white">Available Star Jellies</h3>
            <div className="grid grid-cols-4 gap-4 w-full max-w-3xl mx-auto">
                {props.availableJellies.map((jelly) => (
                    <JellyControl
                        key={jelly.level}
                        jelly={jelly}
                        onSelect={() => {
                            const newJellies = props.availableJellies.map((j) =>
                                j.level === jelly.level ? { ...j, selected: !j.selected } : j
                            );
                            props.setAvailableJellies(newJellies);
                        }}
                        onCountChange={(e) => {
                            const newJellies = props.availableJellies.map((j) =>
                                j.level === jelly.level ? { ...j, count: Number(e.target.value) } : j
                            );
                            props.setAvailableJellies(newJellies);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
