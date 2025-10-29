'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import type { Task } from '@/lib/tasks';

interface TodoListItemsProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
}

export function TodoListItems({ tasks, onDeleteTask }: TodoListItemsProps) {
  return (
    <Card className="shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Your Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-500">
            No tasks yet. Add one above!
          </p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`transition-all bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg ${
                    task.status === 'done'
                      ? 'opacity-70 line-through'
                      : 'hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-3 sm:p-4 flex items-center justify-between">
                    <p className="flex-1 text-gray-900 dark:text-gray-100 break-words">
                      {task.title}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTask(task.id)}
                      className="h-8 w-8 sm:h-9 sm:w-9 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
