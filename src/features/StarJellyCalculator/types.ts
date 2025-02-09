export interface StarJelly {
    level: number;
    baseExp: number;
    effectiveExp: number;
    count?: number;
    selected?: boolean;
}

export interface CalculationResult {
    jellyType: number;
    count: number;
    expProvided: number;
}

export interface EXP_GIVEN_ROW {
    Level: number;
    Base: number;
}

export interface EXP_REQUIREMENT_ROW {
    Level: number;
    XP: number;
}
