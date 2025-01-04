"use client"

import { useAcademicYearStore } from '@/stores/academic-store';
import AddEmail from '../remind/AddEmail'
import { useEffect } from 'react';

export type AcademicYears = {
    id: number;
    year: string;
}
const Navbar = ({ academicYears }: { academicYears: AcademicYears[] }) => {
    const { setAcademicYear } = useAcademicYearStore();
    useEffect(() => {
        setAcademicYear(academicYears);
    }, [academicYears, setAcademicYear]);
    return (
        <div className='fixed right-7 top-3'>
            <AddEmail academicYears={academicYears} />
        </div>
    )
}

export default Navbar