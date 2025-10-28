"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios"; // ✅ Added for proper error typing
import { createTask, fetchTasks, Task } from "@/lib/tasks";
import { TodoList } from "@/components/TodoList";
import { SignIn } from "@/components/SignIn";

export default function TasksView() {
  const qc = useQueryClient();
  const [darkMode, setDarkMode] = useState(false);

  // Fetch tasks from backend
  const { data, isError, error } = useQuery<Task[], AxiosError>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Handle create task mutation with optimistic update
  const create = useMutation<Task, Error, { title: string }, { prev: Task[] }>({
    mutationFn: createTask,
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const prev = qc.getQueryData<Task[]>(["tasks"]) || [];

      const optimistic: Task = {
        id: Math.floor(Number.MAX_SAFE_INTEGER * Math.random()),
        title: vars.title,
        description: null,
        status: "todo",
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      qc.setQueryData<Task[]>(["tasks"], [optimistic, ...prev]);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["tasks"], ctx.prev);
    },
    onSuccess: (serverTask) => {
      qc.setQueryData<Task[]>(["tasks"], (current) => {
        if (!current) return [serverTask];
        const idx = current.findIndex(
          (t) => t.title === serverTask.title && t.id !== serverTask.id
        );
        if (idx >= 0) {
          const copy = current.slice();
          copy[idx] = serverTask;
          return copy;
        }
        return [serverTask, ...current];
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Add task handler
  function handleAdd(title: string) {
    if (!title.trim()) return;
    create.mutate({ title: title.trim() });
  }

  // Temporary delete handler
  function handleDelete(id: number) {
    console.log("Delete task:", id);
  }

  // 401 unauthorized → show Sign-In page
  if (isError && error?.response?.status === 401) {
    return (
      <SignIn />
    );
  }

  // Main layout
  return (
    <TodoList
      tasks={data ?? []}
      onAddTask={handleAdd}
      onDeleteTask={handleDelete}
    />
  );
}
