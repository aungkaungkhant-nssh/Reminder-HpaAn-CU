import { columns } from "@/components/data/columns";
import { DataTable } from "@/components/data/data-table";
import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";

export interface Props {
  searchParams: {
    [key: string]: string
  }
}

export default async function Home({ searchParams }: Props) {
  const currentPage = +searchParams?.page || 1;
  const tutorialSchedules = await getSchedules(ScheduleEnum.Tutorial, currentPage);

  return (
    <div className="w-[100%]">
      <h1 className="text-xl font-bold text-primary">Tutorial Schedule Lists</h1>
      <DataTable
        data={tutorialSchedules.items}
        columns={columns}
        scheduleTitle={ScheduleEnum.Tutorial}
        meta={tutorialSchedules.meta}
        currentPage={currentPage}
      />
    </div>
  );
}
