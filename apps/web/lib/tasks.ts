import api from "./api";

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: "todo" | "in_progress" | "done";
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function fetchTasks(): Promise<Task[]> {
  const { data } = await api.get("/tasks");
  return data;
}

export async function createTask(input: { title: string }): Promise<Task> {
  const { data } = await api.post("/tasks", { title: input.title });
  return data;
}
