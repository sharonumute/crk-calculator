import { useEffect, useRef, useState } from 'react';

type ElementSize = {
    width: number;
    height: number;
};

export const useElementSize = <T extends HTMLElement>(): [React.RefObject<T | null>, ElementSize] => {
    const ref = useRef<T>(null);
    const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setSize({ width, height });
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return [ref, size];
};
