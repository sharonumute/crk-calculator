import React from 'react';
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
} from '@/assets/images/backgrounds';

type PanelBackgroundProps = {
    children: React.ReactNode;
    className?: string;
};

const PanelBackground = ({ children, className = '' }: PanelBackgroundProps) => {
    return (
        <div className={`relative inline-block ${className}`} style={{ height: '-webkit-fill-available' }}>
            <div className="absolute inset-0 flex flex-col">
                <div className="flex flex-shrink-0">
                    <img src={bluePanelBackground_topLeft} className="flex-shrink-0 w-8 h-8" />
                    <img src={bluePanelBackground_topMiddle} className="flex-grow h-8" />
                    <img src={bluePanelBackground_topRight} className="flex-shrink-0 w-8 h-8" />
                </div>

                <div className={`flex`} style={{ height: 'calc(100% - 64px)' }}>
                    <img src={bluePanelBackground_centerLeft} className="flex-shrink-0 w-8" />
                    <img src={bluePanelBackground_centerMiddle} className="flex-grow" />
                    <img src={bluePanelBackground_centerRight} className="flex-shrink-0 w-8" />
                </div>

                <div className="flex flex-shrink-0">
                    <img src={bluePanelBackground_bottomLeft} className="flex-shrink-0 w-8 h-8" />
                    <img src={bluePanelBackground_bottomMiddle} className="flex-grow h-8" />
                    <img src={bluePanelBackground_bottomRight} className="flex-shrink-0 w-8 h-8" />
                </div>
            </div>

            <div className="relative p-4">{children}</div>
        </div>
    );
};

export default PanelBackground;
