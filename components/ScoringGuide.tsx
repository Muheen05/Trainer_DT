import React from 'react';
import { SCORING_LEGEND } from '../constants';
import { Star } from 'lucide-react';

const ScoringGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Grading Methodology</h2>
      <p className="text-gray-600 mb-8">
        Each agent interaction is scored across the 8 sub-parameters. Use this legend to calibrate your scoring.
      </p>

      <div className="space-y-4">
        {SCORING_LEGEND.map((criteria) => {
             const scoreColors = {
                5: 'bg-amber-500 border-amber-600 text-white',
                4: 'bg-emerald-500 border-emerald-600 text-white',
                3: 'bg-blue-500 border-blue-600 text-white',
                2: 'bg-orange-400 border-orange-500 text-white',
                1: 'bg-red-500 border-red-600 text-white',
              };
             // @ts-ignore 
             const headerColor = scoreColors[criteria.score] || 'bg-gray-500';

            return (
                <div key={criteria.score} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                    {/* Score Box */}
                    <div className={`w-full md:w-32 p-6 flex flex-col items-center justify-center ${headerColor}`}>
                        <span className="text-4xl font-bold">{criteria.score}</span>
                        <div className="flex mt-2">
                            {[...Array(criteria.score)].map((_, i) => (
                                <Star key={i} size={12} fill="currentColor" className="text-white bg-opacity-50" />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{criteria.label}</h3>
                            {criteria.score >= 4.6 && <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-2 py-1 rounded">Gold Ride</span>}
                        </div>
                        <p className="text-gray-700 mb-4">{criteria.description}</p>
                        
                        <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-300">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">Example Pattern</span>
                            <p className="text-sm text-gray-600 italic">"{criteria.genericExample}"</p>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default ScoringGuide;