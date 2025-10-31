'use client';

import { useEffect, useState } from 'react';

export function useServiceWorkerUpdate() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            setWaiting(newWorker);
          }
        });
      });
    });
  }, []);

  const update = () => {
    waiting?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  };

  return { waiting, update };
}
