export const useJellyScaling = (jellyLevel: number) => {
    switch (jellyLevel) {
        case 1:
            return 'scale-75';
        case 2:
            return 'scale-90';
        case 3:
            return 'scale-110 translate-y-1';
        default:
            return 'scale-100';
    }
};
