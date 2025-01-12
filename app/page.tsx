
import { columns } from "@/components/data/columns";
import { DataTable } from "@/components/data/data-table";
import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";

export interface Props {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = +(params?.page || 1)
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
