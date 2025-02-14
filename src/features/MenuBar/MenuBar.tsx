import { close_blue_circle, menu_blue, notice, quest_book } from '@/assets/images/icons';
import { StyledButton } from '@/components/shared/StyledButton';
import { Page } from '@/types/Page';
import { useState } from 'react';

type MenuBarProps = {
    pages: Page[];
    setPage: (e: Page) => void;
};

export const MenuBar = ({ pages, setPage }: MenuBarProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    return (
        <div className="w-full">
            <div className="flex gap-3 justify-end pt-2 pr-2">
                <button className="duration-75 hover:scale-105 active:scale-95 flex items-center">
                    <img src={quest_book} className="w-8" />
                </button>

                <button className="duration-75 hover:scale-105 active:scale-95 flex items-center">
                    <img src={notice} className="w-8" />
                </button>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="duration-75 hover:scale-105 active:scale-95 flex items-center"
                >
                    {isExpanded ? (
                        <img src={close_blue_circle} className="w-8" />
                    ) : (
                        <img src={menu_blue} className="w-8" />
                    )}
                </button>
            </div>

            {/* Expandable section */}
            {isExpanded && (
                <div className="mt-2 flex flex-wrap gap-2 justify-end">
                    {pages.map((text, index) => (
                        <StyledButton
                            key={index}
                            label={text}
                            onClick={() => setPage(text)}
                            variant="YellowButton"
                            aria-label={`Navigate to ${text}`}
                            className="text-xs duration-75 hover:scale-105 active:scale-95"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
