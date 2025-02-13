import {
    bluePanelBackground_centerLeft,
    bluePanelBackground_centerMiddle,
    bluePanelBackground_centerRight,
    bluePanelBackground_bottomLeft,
    bluePanelBackground_bottomMiddle,
    bluePanelBackground_bottomRight,
} from '@/assets/images/backgrounds';

type PanelFooterProps = {
    children: React.ReactNode;
    className?: string;
};

export const PanelFooter = ({ children, className = '' }: PanelFooterProps) => (
    <div className={`relative inline-block ${className}`}>
        <div className="absolute inset-0 flex flex-col">
            <div className={`flex`} style={{ height: 'calc(100% - 28px)' }}>
                <img src={bluePanelBackground_centerLeft} className="flex-shrink-0 w-7" />
                <img src={bluePanelBackground_centerMiddle} className="flex-grow" />
                <img src={bluePanelBackground_centerRight} className="flex-shrink-0 w-7" />
            </div>
            <div className="flex flex-shrink-0">
                <img src={bluePanelBackground_bottomLeft} className="flex-shrink-0 w-7 h-7" />
                <img src={bluePanelBackground_bottomMiddle} className="flex-grow h-7" />
                <img src={bluePanelBackground_bottomRight} className="flex-shrink-0 w-7 h-7" />
            </div>
        </div>
        <div className={`relative p-2 flex items-center justify-center h-full`}>{children}</div>
    </div>
);
