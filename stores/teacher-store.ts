import { create } from 'zustand';

// State types
export type Teachers = {
    id: number;
    name: string;
    phone: string;
    academicYearId: number;
};

export type TeachersState = {
    teachers: Teachers[];
};

// Action types
export type TeachersAction = {
    setTeachers: (subjects: Teachers[]) => void;
};

export const useTeacherStore = create<TeachersState & TeachersAction>((set) => ({
    teachers: [], // Initial state
    setTeachers: (teachers) => set(() => ({ teachers })),
}));
