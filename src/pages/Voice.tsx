import React, { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { Mic, Square, Loader2 } from 'lucide-react';

export function Voice() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, we would handle voice recording here
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;

    setIsLoading(true);
    try {
      const prompt = `As a medical AI assistant, please analyze this voice transcript and provide relevant medical insights and recommendations: "${transcript}"`;
      const response = await getGeminiResponse(prompt);
      setAnalysis(response);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error analyzing transcript. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Voice Input</h2>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleRecording}
            className={`p-6 rounded-full ${
              isRecording ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
            } hover:opacity-90 transition-colors`}
          >
            {isRecording ? (
              <Square className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice Transcript
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Your voice transcript will appear here..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!transcript.trim() || isLoading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Voice Input'
          )}
        </button>

        {analysis && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
              {analysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}