import React, { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import { Loader2, Plus, X } from 'lucide-react';

export function Medications() {
  const [medications, setMedications] = useState<string[]>(['']);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMedication = () => {
    setMedications([...medications, '']);
  };

  const removeMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const updateMedication = (index: number, value: string) => {
    const newMedications = [...medications];
    newMedications[index] = value;
    setMedications(newMedications);
  };

  const handleAnalyze = async () => {
    const validMedications = medications.filter(med => med.trim());
    if (validMedications.length === 0) return;

    setIsLoading(true);
    try {
      const prompt = `As a medical AI assistant, please analyze these medications for potential interactions and side effects: ${validMedications.join(', ')}. Provide detailed information about possible interactions between these medications, common side effects, and any precautions that should be taken.`;
      const response = await getGeminiResponse(prompt);
      setAnalysis(response);
    } catch (error) {
      console.error('Error:', error);
      setAnalysis('Error analyzing medications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Medication Interaction Checker</h2>
        
        <div className="space-y-3 mb-4">
          {medications.map((medication, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={medication}
                onChange={(e) => updateMedication(index, e.target.value)}
                placeholder="Enter medication name"
                className="flex-1 p-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
              {medications.length > 1 && (
                <button
                  onClick={() => removeMedication(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addMedication}
          className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4" />
          Add Another Medication
        </button>

        <button
          onClick={handleAnalyze}
          disabled={!medications.some(med => med.trim()) || isLoading}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            'Check Interactions'
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