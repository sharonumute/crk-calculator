type PanelDividerProps = {
    children: React.ReactNode;
    className?: string;
};
export const PanelDivider = ({ children, className }: PanelDividerProps) => (
    <div className={'w-full flex items-center justify-center py-4 ' + className}>
        <div className="relative w-full flex items-center">
            <div className="flex-grow h-0.5 bg-beige" />
            <div className="absolute left-0 w-2 h-2 bg-beige rounded-full" />
            <div className="absolute left-1/2 -translate-x-1/2 h-5 bg-beige rounded-2xl flex items-center justify-center px-6">
                {children}
            </div>
            <div className="flex-grow h-0.5 bg-beige" />
            <div className="absolute right-0 w-2 h-2 bg-beige rounded-full" />
        </div>
    </div>
);
