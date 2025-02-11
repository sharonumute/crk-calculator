import React from 'react';
import {
    blue_panel_bottom_left,
    blue_panel_bottom_middle,
    blue_panel_bottom_right,
    blue_panel_center_left,
    blue_panel_center_middle,
    blue_panel_center_right,
    blue_panel_top_left,
    blue_panel_top_middle,
    blue_panel_top_right,
} from '@/assets/images/backgrounds';

type PanelBackgroundProps = {
    children: React.ReactNode;
    className?: string;
};

const PanelBackground = ({ children, className = '' }: PanelBackgroundProps) => {
    return (
        <div className={`relative inline-block ${className}`} style={{ height: '-webkit-fill-available' }}>
            {/* Background Layer */}
            <div className="absolute inset-0 flex flex-col">
                <div className="flex flex-shrink-0">
                    <img src={blue_panel_top_left} className="flex-shrink-0 w-8 h-8" />
                    <img src={blue_panel_top_middle} className="flex-grow h-8" />
                    <img src={blue_panel_top_right} className="flex-shrink-0 w-8 h-8" />
                </div>

                <div className={`flex`} style={{ height: 'calc(100% - 64px)' }}>
                    <img src={blue_panel_center_left} className="flex-shrink-0 w-8" />
                    <img src={blue_panel_center_middle} className="flex-grow" />
                    <img src={blue_panel_center_right} className="flex-shrink-0 w-8" />
                </div>

                <div className="flex flex-shrink-0">
                    <img src={blue_panel_bottom_left} className="flex-shrink-0 w-8 h-8" />
                    <img src={blue_panel_bottom_middle} className="flex-grow h-8" />
                    <img src={blue_panel_bottom_right} className="flex-shrink-0 w-8 h-8" />
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative p-4">{children}</div>
        </div>
    );
};

export default PanelBackground;
