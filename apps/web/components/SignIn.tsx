'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, Moon, Sun } from 'lucide-react';

export function SignIn() {
  const { theme, setTheme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      {/* Theme toggle button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(darkMode ? 'light' : 'dark')}
          className={darkMode ? 'border-gray-700 hover:bg-gray-800' : ''}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* Animated card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4 sm:px-0"
      >
        <Card className="w-full shadow-xl bg-white dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center space-y-4 p-6 sm:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
            >
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl text-gray-900 dark:text-white">
                Welcome to TaskFlow
              </CardTitle>
              <CardDescription className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Your modern task management solution
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 pt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  {"What's your name?"}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
