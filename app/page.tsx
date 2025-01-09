import { columns } from "@/components/data/columns";
import { DataTable } from "@/components/data/data-table";
import { getSchedules } from "@/server/action/schedule";
import { ScheduleEnum } from "@/utils/enum/Schedule";

export default async function Home() {
  const tutorialSchedules = await getSchedules(ScheduleEnum.Tutorial);
  return (
    <div className="w-[100%]">
      <h1 className="text-xl font-bold text-primary">Tutorial Schedule Lists</h1>
      <DataTable
        data={tutorialSchedules.items}
        columns={columns}
        scheduleTitle={ScheduleEnum.Tutorial}
        totalCount={tutorialSchedules.totalCount}
      />
    </div>
  );
}
