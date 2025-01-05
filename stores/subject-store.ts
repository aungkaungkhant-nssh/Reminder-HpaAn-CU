import { create } from 'zustand';

// State types
export type Subjects = {
    id: number;
    code: string;
    name: string;
}

export type SubjectsState = {
    subjects: Subjects[];
};

// Action types
export type SubjectAction = {
    setSubjects: (subjects: Subjects[]) => void;
};

export const useSubjectsStore = create<SubjectsState & SubjectAction>((set) => ({
    subjects: [], // Initial state
    setSubjects: (subjects) => set(() => ({ subjects })),
}));
