import { create } from 'zustand';

// State types
export type AcademicYears = {
    id: number;
    year: string;
};

export type AcademicYearsState = {
    academicYears: AcademicYears[];
};

// Action types
export type AcademicYearAction = {
    setAcademicYear: (academicYears: AcademicYears[]) => void;
};

export const useAcademicYearStore = create<AcademicYearsState & AcademicYearAction>((set) => ({
    academicYears: [], // Initial state
    setAcademicYear: (academicYears) => set(() => ({ academicYears })),
}));
