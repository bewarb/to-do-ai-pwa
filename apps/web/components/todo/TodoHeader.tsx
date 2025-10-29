'use client';

import { Button } from '../ui/button';
import { CheckCircle2, Download, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { InstallPromptButton } from '../InstallPromptButton';

export function TodoHeader() {
  const { theme, setTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
      {/* Left: Greeting */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 dark:text-white">
            Welcome back!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Let&apos;s get things done today
          </p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex gap-2 self-start sm:self-auto">
        {/* Export */}
        <Button
          variant="outline"
          className="gap-2 border-gray-300 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="hidden lg:inline">Export</span>
        </Button>

        {/* Install App */}
        <InstallPromptButton />

        {/* Theme Toggle */}
        {mounted && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(darkMode ? 'light' : 'dark')}
            className="border-gray-300 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        )}

        {/* Sign Out */}
        <Button
          variant="outline"
          className="gap-2 border-gray-300 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
