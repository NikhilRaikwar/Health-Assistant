import React, { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { Loader2, Calendar } from 'lucide-react';

export function History() {
  const [medicalHistory, setMedicalHistory] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!medicalHistory.trim()) return;

    setIsLoading(true);
    try {
      const prompt = `As a medical AI assistant, please analyze this medical history and provide insights, patterns, and recommendations: "${medicalHistory}"`;
      const response = await getGeminiResponse(prompt);
      setAnalysis(response);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error analyzing medical history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Medical History Analysis</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your medical history
          </label>
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Include past conditions, surgeries, medications, allergies, and family history..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!medicalHistory.trim() || isLoading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze History'
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