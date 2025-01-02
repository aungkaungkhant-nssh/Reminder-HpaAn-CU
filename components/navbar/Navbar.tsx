
import { Button } from '../ui/button'
import { BellIcon } from 'lucide-react'
import AddEmail from '../remind/AddEmail'

export type AcademicYears = {
    id: number;
    year: string;
}
const Navbar = ({ academicYears }: { academicYears: AcademicYears[] }) => {
    return (
        <div className='fixed right-7 top-3'>
            <AddEmail academicYears={academicYears} />
        </div>
    )
}

export default Navbar