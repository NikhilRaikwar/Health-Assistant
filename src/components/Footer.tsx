import React from 'react';
import { Bot } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Bot className="h-4 w-4 text-emerald-600" />
          <span>Health Assistant © 2024</span>
        </div>
      </div>
    </footer>
  );
}