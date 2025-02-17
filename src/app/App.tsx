import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MenuBar } from './MenuBar';
import { StarJellyCalculator } from '@/features/StarJellyCalculator/StarJellyCalculator';
import { SkillPowderCalculator } from '@/features/SkillPowderCalculator/SkillPowderCalculator';

const routes = [
    {
        path: '/star-jelly-calculator',
        name: 'Star Jelly Calculator',
        component: StarJellyCalculator,
    },
    {
        path: '/skill-powder-calculator',
        name: 'Skill Powder Calculator',
        component: SkillPowderCalculator,
    },
] as const;

function App() {
    return (
        <Router>
            <div className="checkered-background w-screen min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="relative flex flex-col md:flex-row-reverse justify-center items-center">
                        <MenuBar routes={routes} />
                        <div className="p-4 w-full min-w-80 max-w-2xl">
                            <Routes>
                                {routes.map(({ path, component: Component }) => (
                                    <Route key={path} path={path} element={<Component />} />
                                ))}
                                <Route path="/" element={<Navigate to="/star-jelly-calculator" replace />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
