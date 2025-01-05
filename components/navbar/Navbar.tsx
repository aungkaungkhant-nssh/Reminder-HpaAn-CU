"use client"

import { AcademicYears } from '@/stores/academic-store';
import AddEmail from '../remind/AddEmail'
import { useEffect } from 'react';
import { Teachers, useTeacherStore } from '@/stores/teacher-store';
import { Subjects, useSubjectsStore } from '@/stores/subject-store';

const Navbar = ({ academicYears, subjects, teachers }: { academicYears: AcademicYears[], subjects: Subjects[], teachers: Teachers[] }) => {
    const { setTeachers } = useTeacherStore();
    const { setSubjects } = useSubjectsStore();
    useEffect(() => {
        setTeachers(teachers);
        setSubjects(subjects)
    }, [subjects, setSubjects, teachers, setTeachers]);
    return (
        <div className='fixed right-7 top-3'>
            <AddEmail academicYears={academicYears} />
        </div>
    )
}

export default Navbar