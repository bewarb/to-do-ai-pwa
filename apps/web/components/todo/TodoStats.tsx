'use client';

import { Card, CardContent } from '../ui/card';
import { CheckCircle2 } from 'lucide-react';

interface TodoStatsProps {
  active: number;
  completed: number;
}

export function TodoStats({ active, completed }: TodoStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Card className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            <p className="text-2xl mt-1 text-gray-900 dark:text-white">{active}</p>
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
            <p className="text-2xl mt-1 text-gray-900 dark:text-white">{completed}</p>
          </div>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
            <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
