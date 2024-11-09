import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Stethoscope,
  Pill,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Link
      to={href}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-emerald-100 rounded-full">{icon}</div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export function Home() {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-600" />,
      title: 'AI Chat Assistant',
      description: 'Get instant answers to your health-related questions',
      href: '/chat',
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-emerald-600" />,
      title: 'Symptom Checker',
      description: 'Analyze your symptoms and get preliminary insights',
      href: '/symptoms',
    },
    {
      icon: <Pill className="w-6 h-6 text-emerald-600" />,
      title: 'Medication Manager',
      description: 'Check drug interactions and manage your medications',
      href: '/medications',
    },
    {
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      title: 'Health Records',
      description: 'Securely store and manage your medical records',
      href: '/records',
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-emerald-600" />,
      title: 'Emergency Info',
      description: 'Quick access to emergency resources',
      href: '/emergency',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Your Personal
            <span className="text-emerald-600"> Health Assistant</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get instant access to AI-powered health insights, symptom checking,
            and medication management—all in one place.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/chat"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}