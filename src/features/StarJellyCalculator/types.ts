export type StarJelly = {
    level: number;
    baseExp: number;
    effectiveExp: number;
    count?: number;
    selected?: boolean;
};

export type CalculationResult = {
    jelly: StarJelly;
    count: number;
    expProvided: number;
};

export type EXP_GIVEN_ROW = {
    Level: number;
    Base: number;
};

export type EXP_REQUIREMENT_ROW = {
    Level: number;
    XP: number;
};
