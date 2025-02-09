import { useState, useEffect } from 'react';

export function useWindowSize(breakpoint = 768) {
    const [isSize, setIsSize] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        function handleResize() {
            setIsSize(window.innerWidth < breakpoint);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isSize;
}
