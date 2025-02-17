import React from 'react';
import {
    blackPanelBackground_bottomLeft,
    blackPanelBackground_bottomMiddle,
    blackPanelBackground_bottomRight,
    blackPanelBackground_centerLeft,
    blackPanelBackground_centerMiddle,
    blackPanelBackground_centerRight,
    blackPanelBackground_topLeft,
    blackPanelBackground_topMiddle,
    blackPanelBackground_topRight,
} from '@/assets/images/backgrounds/BlackPanelBackground';

import {
    bluePanelBackground_bottomLeft,
    bluePanelBackground_bottomMiddle,
    bluePanelBackground_bottomRight,
    bluePanelBackground_centerLeft,
    bluePanelBackground_centerMiddle,
    bluePanelBackground_centerRight,
    bluePanelBackground_topLeft,
    bluePanelBackground_topMiddle,
    bluePanelBackground_topRight,
} from '@/assets/images/backgrounds/BluePanelBackground';

type PanelBackgroundVariant = 'Blue' | 'Black';
type PanelBackgroundProps = {
    children: React.ReactNode;
    className?: string;
    variant?: PanelBackgroundVariant;
};

export const PanelBackground = ({ children, className = '', variant = 'Blue' }: PanelBackgroundProps) => {
    const panelParts = getPanelParts(variant);

    return (
        <div className={`${className} relative inline-block`} style={{ height: '-webkit-fill-available' }}>
            <div className="absolute inset-0 flex flex-col">
                <div className="flex flex-shrink-0">
                    <img src={panelParts[0]} className="flex-shrink-0 w-8 h-8" />
                    <img src={panelParts[1]} className="flex-grow h-8" />
                    <img src={panelParts[2]} className="flex-shrink-0 w-8 h-8" />
                </div>

                <div className={`flex`} style={{ height: 'calc(100% - 64px)' }}>
                    <img src={panelParts[3]} className="flex-shrink-0 w-8" />
                    <div className="flex-grow relative min-w-0">
                        <img src={panelParts[4]} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <img src={panelParts[5]} className="flex-shrink-0 w-8" />
                </div>

                <div className="flex flex-shrink-0">
                    <img src={panelParts[6]} className="flex-shrink-0 w-8 h-8" />
                    <img src={panelParts[7]} className="flex-grow h-8" />
                    <img src={panelParts[8]} className="flex-shrink-0 w-8 h-8" />
                </div>
            </div>

            <div className="relative">{children}</div>
        </div>
    );
};

function getPanelParts(variant: PanelBackgroundVariant) {
    switch (variant) {
        case 'Black':
            return [
                blackPanelBackground_topLeft,
                blackPanelBackground_topMiddle,
                blackPanelBackground_topRight,
                blackPanelBackground_centerLeft,
                blackPanelBackground_centerMiddle,
                blackPanelBackground_centerRight,
                blackPanelBackground_bottomLeft,
                blackPanelBackground_bottomMiddle,
                blackPanelBackground_bottomRight,
            ];
        case 'Blue':
        default:
            return [
                bluePanelBackground_topLeft,
                bluePanelBackground_topMiddle,
                bluePanelBackground_topRight,
                bluePanelBackground_centerLeft,
                bluePanelBackground_centerMiddle,
                bluePanelBackground_centerRight,
                bluePanelBackground_bottomLeft,
                bluePanelBackground_bottomMiddle,
                bluePanelBackground_bottomRight,
            ];
    }
}
