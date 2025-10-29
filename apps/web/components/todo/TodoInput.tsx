'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon, Clock, Plus } from 'lucide-react';
import { useState } from 'react';

interface TodoInputProps {
  onAddTask: (title: string, dueDate?: Date, dueTime?: string) => void;
}

export function TodoInput({ onAddTask }: TodoInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('12:00');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem('task') as HTMLInputElement;
        if (input.value.trim()) {
          onAddTask(input.value.trim(), selectedDate, selectedTime);
          input.value = '';
        }
      }}
      className="mb-6 flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-lg"
    >
      <Input
        id="task"
        type="text"
        placeholder="Add a new task..."
        className="h-12 flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
      />

      <div className="flex gap-2">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 px-3 sm:px-4 gap-2 border-gray-300 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <CalendarIcon className="w-5 h-5" />
              <span className="hidden sm:inline">
                {selectedDate ? selectedDate.toLocaleDateString() : 'Set Date'}
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
              className="h-12 px-3 sm:px-4 gap-2 border-gray-300 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Clock className="w-5 h-5" />
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
          className="h-12 px-4 sm:px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 gap-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden lg:inline">Add Task</span>
        </Button>
      </div>
    </form>
  );
}
