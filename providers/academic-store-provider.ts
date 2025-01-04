// 'use client'

// import { type ReactNode, createContext, useRef, useContext } from 'react'
// import { useStore } from 'zustand'

// import {
//     type AcademicYearStore,
//     createAcademicYearStore,
//     initAcademicYearStore
// } from '../stores/academic-store'

// export type AcademicYearStoreApi = ReturnType<typeof createAcademicYearStore>

// export const AcademicYearStoreContext = createContext<AcademicYearStoreApi | undefined>(
//     undefined,
// )

// export interface AcademicYearStoreProviderProps {
//     children: ReactNode
// }

// export const AcademicYearStoreProvider = ({
//     children,
// }: AcademicYearStoreProviderProps) => {
//     const storeRef = useRef<AcademicYearStoreApi | undefined>(undefined)
//     if (!storeRef.current) {
//         storeRef.current = createAcademicYearStore(initAcademicYearStore())
//     }

//     return (
//         AcademicYearStoreContext.Provider
//     )
// }

// export const useAcademicYearStore = <T,>(
//     selector: (store: AcademicYearStore) => T,
// ): T => {
//     const academicYearStoreContext = useContext(AcademicYearStoreContext)

//     if (!academicYearStoreContext) {
//         throw new Error(`useAcademicYearStore must be used within AcademicYearStoreProvider`)
//     }

//     return useStore(academicYearStoreContext, selector)
// }
