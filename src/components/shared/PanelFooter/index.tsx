import {
    blue_panel_center_left,
    blue_panel_center_middle,
    blue_panel_center_right,
    blue_panel_bottom_left,
    blue_panel_bottom_middle,
    blue_panel_bottom_right,
} from '@/assets/images/backgrounds';

type PanelFooterProps = {
    children: React.ReactNode;
    className?: string;
};

export const PanelFooter = ({ children, className = '' }: PanelFooterProps) => (
    <div className={`relative inline-block ${className}`}>
        <div className="absolute inset-0 flex flex-col">
            <div className={`flex`} style={{ height: 'calc(100% - 28px)' }}>
                <img src={blue_panel_center_left} className="flex-shrink-0 w-7" />
                <img src={blue_panel_center_middle} className="flex-grow" />
                <img src={blue_panel_center_right} className="flex-shrink-0 w-7" />
            </div>
            <div className="flex flex-shrink-0">
                <img src={blue_panel_bottom_left} className="flex-shrink-0 w-7 h-7" />
                <img src={blue_panel_bottom_middle} className="flex-grow h-7" />
                <img src={blue_panel_bottom_right} className="flex-shrink-0 w-7 h-7" />
            </div>
        </div>
        <div className={`relative p-2 ${className}`}>{children}</div>
    </div>
);
