import React, { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { Upload, Loader2, FileText } from 'lucide-react';

export function Records() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      // In a real app, we would process the file here
      const prompt = `As a medical AI assistant, please analyze this medical record and provide a summary of key findings, recommendations, and any areas of concern.`;
      const response = await getGeminiResponse(prompt);
      setAnalysis(response);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error analyzing medical record. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Medical Records Analysis</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Medical Record
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX or TXT up to 10MB
              </p>
            </div>
          </div>
        </div>

        {selectedFile && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Selected file: {selectedFile.name}
            </p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || isLoading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Record'
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