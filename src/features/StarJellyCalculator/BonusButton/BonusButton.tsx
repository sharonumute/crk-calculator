import { useState, useRef, useEffect } from 'react';
import { hot_time_balloon } from '@/assets/images/balloons';
import { hot_time_icon, hot_time_arrow, plus_red_circle } from '@/assets/images/icons';
import { labBonusPercentages } from '../consts';
import { StyledSelect } from '@/components/shared/StyledSelect';
import { Counter } from '@/components/shared/Counter';
import { PanelBackground } from '@/components/shared/PanelBackground';

export interface BonusButtonProps {
    burningTimePercent: number;
    labUpgradeLevel: number;
    onBurningTimePercentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLabUpgradeLevelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BonusButton = ({
    burningTimePercent,
    labUpgradeLevel,
    onBurningTimePercentChange,
    onLabUpgradeLevelChange,
}: BonusButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                buttonRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside, true);

            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.pointerEvents = 'none';
            if (modalRef.current) {
                modalRef.current.style.pointerEvents = 'auto';
            }
            if (buttonRef.current) {
                buttonRef.current.style.pointerEvents = 'auto';
            }
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
            // Fixes issue with scrollbar appearing
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.body.style.pointerEvents = 'auto';
            window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
        };
    }, [isOpen]);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const bonusModal = isOpen && (
        <>
            <div
                className="fixed inset-0 z-40 bg-transparent overflow-hidden"
                onClick={() => setIsOpen(false)}
                style={{ pointerEvents: 'auto' }}
            />

            <div ref={modalRef} className="absolute top-4 right-0 mt-2 z-50" onClick={(e) => e.stopPropagation()}>
                <PanelBackground variant="Black">
                    <div className="p-4 w-50">
                        <div className="grid grid-cols-1 gap-4 items-end">
                            <StyledSelect
                                label="Lab Upgrade Level (1-5)"
                                value={labUpgradeLevel}
                                onChange={onLabUpgradeLevelChange}
                                options={[
                                    'No Upgrade',
                                    'Level 1 (+1%)',
                                    'Level 2 (+3%)',
                                    'Level 3 (+5%)',
                                    'Level 4 (+7%)',
                                    'Level 5 (+10%)',
                                ]}
                            />

                            <Counter value={burningTimePercent} onChange={onBurningTimePercentChange} max={100} />
                        </div>
                    </div>
                </PanelBackground>
            </div>
        </>
    );

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className="absolute -right-1.5 -top-2 z-30"
                aria-label="Modify EXP Efficiency"
            >
                {labUpgradeLevel + burningTimePercent === 0 ? (
                    <img src={plus_red_circle} className="w-8 h-8" />
                ) : (
                    <>
                        <img src={hot_time_balloon} className="w-18 h-8" />
                        <div className="absolute top-1 grid grid-cols-3 gap-1.5 items-center justify-items-center">
                            <img src={hot_time_icon} className="w-4" />
                            <p
                                className="cookie-run-font text-outline-sm text-yellow-300 text-sm h-4.5 pb-4"
                                aria-label="Total EXP efficiency being applied"
                            >
                                {labBonusPercentages[labUpgradeLevel] * 100 + burningTimePercent}%
                            </p>
                            <img src={hot_time_arrow} className="w-4" />
                        </div>
                    </>
                )}
            </button>
            {bonusModal}
        </div>
    );
};

export interface BonusButtonWrapperProps extends BonusButtonProps {
    children?: React.ReactNode;
}

const BonusButtonWrapper = (props: BonusButtonWrapperProps) => {
    return (
        <div className="relative">
            <BonusButton
                burningTimePercent={props.burningTimePercent}
                labUpgradeLevel={props.labUpgradeLevel}
                onBurningTimePercentChange={props.onBurningTimePercentChange}
                onLabUpgradeLevelChange={props.onLabUpgradeLevelChange}
            />

            {props.children}
        </div>
    );
};

export default BonusButtonWrapper;
