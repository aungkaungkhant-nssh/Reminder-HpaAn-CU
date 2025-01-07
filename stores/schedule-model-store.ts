import { create } from 'zustand';

// State types
export type ScheduleModelState = {
    isOpen: boolean;
    isEdit: boolean;
    id?: number | null;
};

// Action types
export type ScheduleModelAction = {
    showModel: (scheduleModel: ScheduleModelState) => void;
};

// Combined Zustand store
export const useScheduleModelStore = create<ScheduleModelState & ScheduleModelAction>((set) => ({
    // Initial state
    isOpen: false,
    isEdit: false,
    id: null,
    showModel: ({ id, isOpen, isEdit }) =>
        set(() => ({
            isOpen,
            isEdit,
            id,
        })),
}));
