import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchTasks } from "@/lib/tasks";
import TasksView from "./view";

export const dynamic = "force-dynamic"; // optional during dev

export default async function TasksPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <TasksView />
    </HydrationBoundary>
  );
}
