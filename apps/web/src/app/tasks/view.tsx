"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTasks, Task } from "@/lib/tasks";
import { useState } from "react";

export default function TasksView() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");

  const { data, isLoading, isError, error } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

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

  function handleAdd() {
    if (!title.trim()) return;
    create.mutate({ title: title.trim() });
    setTitle("");
  }

  if (isError && (error as any)?.response?.status === 401) {
    return (
      <div
        data-testid="signin-placeholder"
        className="mt-24 text-center text-gray-500"
      >
        Sign in to view your tasks.
      </div>
    );
  }

  return (
    <main className="mx-auto mt-16 max-w-lg p-4">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">Tasks</h1>

      <div className="mb-6 flex gap-2">
        <input
          placeholder="Add a task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1 rounded-md border border-gray-300 p-2 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          disabled={create.isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading…</p>
      ) : !data?.length ? (
        <p className="text-gray-400">No tasks yet.</p>
      ) : (
        <ul
          className="space-y-2"
          data-testid="task-list"
        >
          {data.map((t: Task) => (
            <li
              key={t.id}
              className="rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-800 shadow-sm transition hover:bg-gray-100"
            >
              {t.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}