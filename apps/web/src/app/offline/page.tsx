'use client';

export default function Offline() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-900 text-white">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">📡</div>
          <h1 className="text-4xl font-bold mb-4">You&apos;re Offline</h1>
          <p className="text-xl text-gray-400 mb-8">
            It looks like you&apos;ve lost your internet connection. Don&apos;t worry—we&apos;ll sync your changes when you reconnect.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }