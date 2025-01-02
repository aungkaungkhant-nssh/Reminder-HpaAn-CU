import Navbar from "@/components/navbar/Navbar";
import { getAcademicYears } from "@/server/action/academic-years";

export default async function Home() {
  const academicYears = await getAcademicYears();
  return (
    <div>
      <Navbar academicYears={academicYears} />
    </div>
  );
}
