'use client';

import { motion } from 'motion/react';
import { TodoHeader } from './TodoHeader';
import { TodoStats } from './TodoStats';
import { TodoInput } from './TodoInput';
import { TodoListItems } from './TodoListItems';
import type { Task } from '@/lib/tasks';

interface TodoListProps {
  tasks: Task[];
  onAddTask: (title: string, dueDate?: Date, dueTime?: string) => void;
  onDeleteTask: (id: number) => void;
}

export function TodoList({ tasks, onAddTask, onDeleteTask }: TodoListProps) {
  const active = tasks.filter((t) => t.status !== 'done').length;
  const completed = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <TodoHeader />
        <TodoStats active={active} completed={completed} />
        <TodoInput onAddTask={onAddTask} />
        <TodoListItems tasks={tasks} onDeleteTask={onDeleteTask} />
      </motion.div>
    </div>
  );
}
