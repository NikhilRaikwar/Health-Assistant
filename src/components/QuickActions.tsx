import React from 'react';
import { 
  Pill, 
  Stethoscope, 
  FileText, 
  AlertCircle,
  Globe,
  History,
  Volume2
} from 'lucide-react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function QuickAction({ icon, label, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-100 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-xs text-gray-600 font-medium text-center">
        {label}
      </span>
    </button>
  );
}

export function QuickActions() {
  const actions = [
    { icon: <Stethoscope className="w-5 h-5 text-emerald-600" />, label: 'Symptoms', action: () => {} },
    { icon: <Pill className="w-5 h-5 text-blue-600" />, label: 'Medications', action: () => {} },
    { icon: <FileText className="w-5 h-5 text-purple-600" />, label: 'Records', action: () => {} },
    { icon: <Globe className="w-5 h-5 text-indigo-600" />, label: 'Language', action: () => {} },
    { icon: <History className="w-5 h-5 text-amber-600" />, label: 'History', action: () => {} },
    { icon: <Volume2 className="w-5 h-5 text-rose-600" />, label: 'Voice', action: () => {} },
    { icon: <AlertCircle className="w-5 h-5 text-red-600" />, label: 'Emergency', action: () => {} },
  ];

  return (
    <div className="flex overflow-x-auto gap-2 p-2 -mx-2">
      {actions.map((action, index) => (
        <QuickAction
          key={index}
          icon={action.icon}
          label={action.label}
          onClick={action.action}
        />
      ))}
    </div>
  );
}