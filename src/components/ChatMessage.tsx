import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  isBot: boolean;
  message: string;
  timestamp: string;
}

export function ChatMessage({ isBot, message, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center">
            {isBot ? (
              <div className="bg-emerald-100 rounded-full p-2">
                <Bot className="w-4 h-4 text-emerald-600" />
              </div>
            ) : (
              <div className="bg-blue-100 rounded-full p-2">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            )}
          </div>
        </div>
        <div>
          <div
            className={`rounded-2xl px-4 py-2 ${
              isBot
                ? 'bg-emerald-50 text-emerald-900'
                : 'bg-blue-50 text-blue-900'
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}