import {
    bluePanelBackground_centerLeft,
    bluePanelBackground_centerMiddle,
    bluePanelBackground_centerRight,
    bluePanelBackground_topLeft,
    bluePanelBackground_topMiddle,
    bluePanelBackground_topRight,
} from '@/assets/images/backgrounds/BluePanelBackground';

type PanelHeaderProps = {
    children: React.ReactNode;
    className?: string;
};

export const PanelHeader = ({ children, className = '' }: PanelHeaderProps) => (
    <div className={`relative inline-block ${className}`}>
        <div className="absolute inset-0 flex flex-col">
            <div className="flex flex-shrink-0">
                <img src={bluePanelBackground_topLeft} className="flex-shrink-0 w-7 h-7" />
                <img src={bluePanelBackground_topMiddle} className="flex-grow h-7" />
                <img src={bluePanelBackground_topRight} className="flex-shrink-0 w-7 h-7" />
            </div>

            <div className={`flex`} style={{ height: 'calc(100% - 28px)' }}>
                <img src={bluePanelBackground_centerLeft} className="flex-shrink-0 w-7" />
                <img src={bluePanelBackground_centerMiddle} className="flex-grow" />
                <img src={bluePanelBackground_centerRight} className="flex-shrink-0 w-7" />
            </div>
        </div>
        <div className={`relative ${className}`}>{children}</div>
    </div>
);

type PanelHeaderTextProps = {
    text: string;
};
export const PanelHeaderText = ({ text }: PanelHeaderTextProps) => {
    return (
        <h1 className="flex items-center justify-center text-white drop-shadow cookie-run-font font-bold text-lg text-outline-sm pt-1 tracking-wider h-full">
            {text}
        </h1>
    );
};
