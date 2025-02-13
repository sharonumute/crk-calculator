import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useWindowSize } from '@/hooks/useWindowSize';

type AdaptiveTooltipProps = {
    content: React.ReactNode;
    children: React.ReactNode;
};

export const AdaptiveTooltip = ({ content, children }: AdaptiveTooltipProps) => {
    const isMobile = useWindowSize();
    const [isOpen, setIsOpen] = useState(false);

    const handleTriggerClick = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
        }
    };

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsOpen(false);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip open={isOpen}>
                <TooltipTrigger
                    onClick={handleTriggerClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="inline-block"
                >
                    {children}
                </TooltipTrigger>
                <TooltipContent>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
