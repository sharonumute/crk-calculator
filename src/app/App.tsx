import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MenuBar } from './components/MenuBar';
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
            <div className="checkered-background w-screen min-h-screen flex flex-col justify-between">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="relative w-full flex flex-col md:flex-row-reverse justify-center items-center">
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
                <footer className="w-full bg-slate-700 text-center py-4 border-t border-slate-600 mt-auto z-50">
                    <p className="text-gray-200 cookie-run-font">
                        © 2025 All Rights Reserved by Devsisters. This is a fan project and is not affiliated with
                        Devsisters.
                    </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
