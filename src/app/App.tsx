import { MenuBar } from '@/features/MenuBar/MenuBar';
import { StarJellyCalculator } from '@/features/StarJellyCalculator/StarJellyCalculator';
import { Page } from '@/types/Page';
import { useState } from 'react';

function App() {
    const availablePages: Page[] = ['Star Jelly Calculator', 'Skill Powder Calculator', 'Promotion Calculator'];
    const [, setCurrentPage] = useState(availablePages[0]);
    return (
        <div className="checkered-background w-screen min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="relative flex flex-col md:flex-row-reverse justify-center items-center">
                    <MenuBar pages={availablePages} setPage={setCurrentPage} />
                    <div className="p-4 w-full min-w-80 max-w-2xl">
                        <StarJellyCalculator />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
