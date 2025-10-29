'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function InstallPromptButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome’s mini-infobar
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () =>
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      console.log('User accepted install');
    } else {
      console.log('User dismissed install');
    }
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={handleInstallClick}
            variant="outline"
            className="gap-2 border-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:text-white transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="hidden lg:inline">Install App</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Type helper for TS
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}
