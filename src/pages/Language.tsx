import React, { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { Loader2, Globe } from 'lucide-react';

export function Language() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
    'Hindi'
  ];

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const prompt = `Translate the following medical text to ${targetLanguage}: "${text}"`;
      const response = await getGeminiResponse(prompt);
      setTranslation(response);
    } catch (error) {
      console.error('Error:', error);
      setTranslation('Error translating text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Medical Translation</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter medical text to translate
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter text here..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select target language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTranslate}
          disabled={!text.trim() || isLoading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Translating...
            </>
          ) : (
            'Translate'
          )}
        </button>

        {translation && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Translation</h3>
            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
              {translation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}