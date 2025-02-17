import { close_blue_circle, menu_blue, quest_book } from '@/assets/images/icons';
import { StyledButton } from '@/components/shared/StyledButton';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateModal } from './UpdateModal';

type Route = {
    path: string;
    name: string;
    component: React.ComponentType;
};

type MenuBarProps = {
    routes: readonly Route[];
};

export const MenuBar = ({ routes }: MenuBarProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="w-full md:w-min md:mb-auto">
            <div className="relative flex gap-3 justify-end pt-2 pr-2">
                <button
                    className="w-8 duration-75 hover:scale-115 active:scale-95 flex items-center cursor-pointer"
                    onClick={() => window.open('https://cookierunkingdom.fandom.com/wiki/Cookie_Upgrading', '_blank')}
                >
                    <img src={quest_book} className="w-8" />
                </button>

                <UpdateModal />

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-8 duration-75 hover:scale-105 active:scale-95 flex items-center"
                >
                    {isExpanded ? (
                        <img src={close_blue_circle} className="w-8" />
                    ) : (
                        <img src={menu_blue} className="w-8" />
                    )}
                </button>
            </div>

            {isExpanded && (
                <div className="mt-2 flex flex-wrap gap-2 justify-end">
                    {routes.map(({ path, name }, index) => (
                        <StyledButton
                            key={index}
                            label={name}
                            onClick={() => navigate(path)}
                            variant={location.pathname === path ? 'RedButton' : 'YellowButton'}
                            aria-label={`Navigate to ${name}`}
                            className="text-xs sm:text-base duration-75 hover:scale-105 active:scale-95 whitespace-nowrap"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
