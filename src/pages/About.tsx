import React from 'react';
import { Bot, Shield, Lock, Zap } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
      <div className="p-3 bg-emerald-100 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function About() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-emerald-600" />,
      title: "AI-Powered Assistant",
      description: "Advanced AI technology to provide accurate and helpful health-related information and guidance."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: "Reliable Information",
      description: "Access to verified medical information and resources to help you make informed decisions."
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-600" />,
      title: "Private & Secure",
      description: "Your health information is protected with enterprise-grade security and privacy measures."
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: "Quick Access",
      description: "Get instant access to symptom checking, medication information, and health record analysis."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Personal Health Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Empowering you with AI-driven health insights and personalized medical information management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-4">About Our Technology</h2>
        <div className="prose prose-emerald max-w-none">
          <p className="text-gray-600 mb-4">
            Our health assistant uses advanced AI technology to provide you with accurate and helpful health-related information. We combine natural language processing with medical knowledge to offer personalized assistance for your health queries.
          </p>
          <p className="text-gray-600">
            While we provide valuable health information and guidance, we always recommend consulting with healthcare professionals for medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  );
}