import { StarJelly } from '@/features/StarJellyCalculator/types';
import { JellyControl } from './JellyControl';
import { PanelBackground } from '@/components/shared/PanelBackground';

type JellyControlGridProps = {
    setAvailableJellies: (jellies: StarJelly[]) => void;
    availableJellies: StarJelly[];
};

export const JellyControlGrid = (props: JellyControlGridProps) => {
    return (
        <PanelBackground className="w-full max-w-xl">
            <div className="block">
                <h3 className="text-3xl font-semibold mb-2 text-white cookie-run-font text-outline text-center md:text-left">
                    Available Star Jellies
                </h3>
                <div className="grid grid-cols-4 gap-1 w-full max-w-3xl mx-auto">
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
        </PanelBackground>
    );
};
