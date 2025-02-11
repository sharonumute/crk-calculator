import {
    blue_panel_center_left,
    blue_panel_center_middle,
    blue_panel_center_right,
    blue_panel_top_left,
    blue_panel_top_middle,
    blue_panel_top_right,
} from '@/assets/images/backgrounds';

type PanelHeaderProps = {
    children: React.ReactNode;
    className?: string;
};

export const PanelHeader = ({ children, className = '' }: PanelHeaderProps) => (
    <div className={`relative inline-block ${className}`}>
        <div className="absolute inset-0 flex flex-col">
            <div className="flex flex-shrink-0">
                <img src={blue_panel_top_left} className="flex-shrink-0 w-7 h-7" />
                <img src={blue_panel_top_middle} className="flex-grow h-7" />
                <img src={blue_panel_top_right} className="flex-shrink-0 w-7 h-7" />
            </div>

            <div className={`flex`} style={{ height: 'calc(100% - 28px)' }}>
                <img src={blue_panel_center_left} className="flex-shrink-0 w-7" />
                <img src={blue_panel_center_middle} className="flex-grow" />
                <img src={blue_panel_center_right} className="flex-shrink-0 w-7" />
            </div>
        </div>
        <div className={`relative ${className}`}>{children}</div>
    </div>
);
