'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import {
  Trash2,
  Plus,
  LogOut,
  CheckCircle2,
  Moon,
  Sun,
  Download,
  CalendarIcon,
  Clock,
} from 'lucide-react';
import type { Task } from '@/lib/tasks';

interface TodoListProps {
  tasks: Task[];
  onAddTask: (title: string, dueDate?: Date, dueTime?: string) => void;
  onDeleteTask: (id: number) => void;
}

export function TodoList({ tasks, onAddTask, onDeleteTask }: TodoListProps) {
  const { theme, setTheme } = useTheme();
  const darkMode = theme === 'dark';

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('12:00');

  const activeTodos = tasks.filter((t) => t.status !== 'done').length;
  const completedTodos = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl truncate text-gray-900 dark:text-white">
                Welcome back!
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Let&apos;s get things done today
              </p>
            </div>
          </div>

          <div className="flex gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              className="gap-2 border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline">Export</span>
            </Button>
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(darkMode ? 'light' : 'dark')}
                className="border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}
            <Button
              variant="outline"
              className="gap-2 border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline">Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl mt-1 text-gray-900 dark:text-white">
                  {activeTodos}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl mt-1 text-gray-900 dark:text-white">
                  {completedTodos}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
                <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Todo Input */}
        <Card className="mb-6 shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
          <CardContent className="p-4 sm:p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('task') as HTMLInputElement;
                if (input.value.trim()) {
                  onAddTask(input.value.trim(), selectedDate, selectedTime);
                  input.value = '';
                }
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                id="task"
                type="text"
                placeholder="Add a new task..."
                className="h-12 flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />

              <div className="flex gap-2">
                {/* Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 px-3 sm:px-4 border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
                    >
                      <CalendarIcon className="w-5 h-5 mr-1" />
                      <span className="hidden sm:inline">
                        {selectedDate
                          ? selectedDate.toLocaleDateString()
                          : 'Set Date'}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    sideOffset={8}
                    className="w-auto p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl"
                  >
                    <div className="flex justify-center items-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        showOutsideDays={false}
                        className="rounded-md"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Time Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 px-3 sm:px-4 border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
                    >
                      <Clock className="w-5 h-5 mr-1" />
                      <span className="hidden sm:inline">{selectedTime}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-3 w-36 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="h-10 w-full bg-transparent text-gray-900 dark:text-white"
                    />
                  </PopoverContent>
                </Popover>

                {/* Add Button */}
                <Button
                  type="submit"
                  className="h-12 px-4 sm:px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 gap-2 rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden lg:inline">Add Task</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Todo List */}
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
      </motion.div>
    </div>
  );
}
