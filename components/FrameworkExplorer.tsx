import React, { useState } from 'react';
import { PILLARS } from '../constants';
import { ChevronDown, CheckCircle2, XCircle } from 'lucide-react';

const FrameworkExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PILLARS[0].id);

  const activePillar = PILLARS.find(p => p.id === activeTab) || PILLARS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 justify-center">
            {PILLARS.map(pillar => (
                <button
                    key={pillar.id}
                    onClick={() => setActiveTab(pillar.id)}
                    className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3 shadow-lg ${
                        activeTab === pillar.id 
                        ? `${pillar.color.replace('bg-', 'bg-').replace('text-', 'text-')} ring-2 ring-offset-2 ring-gray-200 scale-105` 
                        : 'bg-white text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    <span className="w-8 h-8 rounded-full bg-current bg-opacity-20 flex items-center justify-center text-sm">
                        {pillar.id}
                    </span>
                    {pillar.name}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
            {/* Header */}
            <div className={`p-8 ${activePillar.color} bg-opacity-10 border-b border-gray-100`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{activePillar.name}</h2>
                        <p className="text-xl font-medium opacity-80">{activePillar.meaning}</p>
                    </div>
                    <div className="bg-white bg-opacity-60 p-4 rounded-xl border border-white border-opacity-50 backdrop-blur-sm max-w-md">
                        <span className="uppercase text-xs font-bold tracking-wider opacity-60 block mb-1">Purpose</span>
                        <p className="italic text-gray-800">"{activePillar.purpose}"</p>
                    </div>
                </div>
            </div>

            {/* Sub Parameters Grid */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activePillar.subParameters.map(sub => (
                    <div key={sub.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{sub.name}</h3>
                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md font-mono">Weight: {sub.weight}%</span>
                        </div>
                        <p className="text-gray-600 mb-6">{sub.description}</p>

                        <div className="space-y-6">
                            {/* Checklist */}
                            <div>
                                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3">Evaluator Checklist</h4>
                                <ul className="space-y-2">
                                    {sub.checklist.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <div className="min-w-[5px] h-[5px] rounded-full bg-gray-400 mt-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Indicators */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                                    <h4 className="text-emerald-800 font-bold text-sm mb-2 flex items-center gap-2">
                                        <CheckCircle2 size={16} /> Positive
                                    </h4>
                                    <ul className="text-xs text-emerald-700 space-y-1">
                                        {sub.positiveIndicators.map((pos, i) => (
                                            <li key={i}>• {pos}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                                    <h4 className="text-red-800 font-bold text-sm mb-2 flex items-center gap-2">
                                        <XCircle size={16} /> Negative
                                    </h4>
                                    <ul className="text-xs text-red-700 space-y-1">
                                        {sub.negativeIndicators.map((neg, i) => (
                                            <li key={i}>• {neg}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default FrameworkExplorer;