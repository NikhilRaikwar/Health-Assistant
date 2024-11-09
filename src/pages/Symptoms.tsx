import React, { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { Loader2 } from 'lucide-react';

export function Symptoms() {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsLoading(true);
    try {
      const prompt = `As a medical AI assistant, please analyze these symptoms and provide potential causes, recommended actions, and whether immediate medical attention might be needed. Format the response in clear sections without markdown symbols. Symptoms: ${symptoms}`;
      const response = await getGeminiResponse(prompt);
      const formattedResponse = response.replace(/\*\*/g, '').trim();
      setAnalysis(formattedResponse);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error analyzing symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Symptom Checker</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your symptoms
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 resize-none"
            placeholder="Enter your symptoms here..."
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={!symptoms.trim() || isLoading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Symptoms'
          )}
        </button>
        {analysis && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
            <div className="bg-gray-50 rounded-lg p-4 prose prose-emerald max-w-none">
              {analysis.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}