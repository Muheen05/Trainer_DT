import React, { useState } from 'react';
import { PILLARS, DECISION_TREES } from '../constants';
import { DecisionNode } from '../types';
import { ChevronRight, RefreshCw, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

const DecisionTreeTool: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const [selectedSubParamId, setSelectedSubParamId] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  // Helpers
  const currentPillar = PILLARS.find(p => p.id === selectedPillarId);
  const currentSubParam = currentPillar?.subParameters.find(sp => sp.id === selectedSubParamId);
  const currentTree = selectedSubParamId ? DECISION_TREES[selectedSubParamId] : null;
  const currentNode: DecisionNode | null = (currentTree && currentNodeId) ? currentTree.nodes[currentNodeId] : null;

  const handleStart = (subParamId: string) => {
    setSelectedSubParamId(subParamId);
    const tree = DECISION_TREES[subParamId];
    if (tree) {
      setCurrentNodeId(tree.startNodeId);
      setHistory(['start']);
    } else {
      // Fallback for demo purposes if tree not defined for all params
      alert("Decision tree logic for this specific parameter is coming soon in the full build. Try 'Problem Clarity' or 'Solution Accuracy' for the demo.");
      setSelectedSubParamId(null);
    }
  };

  const handleAnswer = (nextId: string | undefined) => {
    if (nextId) {
      setCurrentNodeId(nextId);
      setHistory(prev => [...prev, nextId]);
    }
  };

  const handleReset = () => {
    setSelectedPillarId(null);
    setSelectedSubParamId(null);
    setCurrentNodeId(null);
    setHistory([]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentNodeId(newHistory[newHistory.length - 1]);
    } else {
      setSelectedSubParamId(null);
      setCurrentNodeId(null);
    }
  };

  // Render Outcome
  if (currentNode?.outcomeScore !== undefined) {
    const scoreColors = {
      5: 'bg-amber-100 text-amber-800 border-amber-300',
      4: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      3: 'bg-blue-100 text-blue-800 border-blue-300',
      2: 'bg-orange-100 text-orange-800 border-orange-300',
      1: 'bg-red-100 text-red-800 border-red-300',
    };
    
    // @ts-ignore
    const colorClass = scoreColors[currentNode.outcomeScore] || 'bg-gray-100';

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className={`p-8 rounded-xl border-2 ${colorClass} text-center`}>
          <div className="text-6xl font-bold mb-4">{currentNode.outcomeScore}</div>
          <h3 className="text-2xl font-bold mb-2">Recommended Score</h3>
          <p className="text-lg opacity-90">{currentNode.outcomeText}</p>
        </div>
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition shadow-lg"
          >
            <RefreshCw size={20} /> Start New Evaluation
          </button>
        </div>
      </div>
    );
  }

  // Render Tree Selection (Wizard Step 1)
  if (!selectedSubParamId) {
    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Scoring Assistant</h2>
        <p className="text-gray-500 mb-8">Select a parameter to begin the guided evaluation process.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map(pillar => (
            <div key={pillar.id} className="space-y-4">
              <div className={`p-3 rounded-lg font-bold text-center ${pillar.color}`}>
                {pillar.id} - {pillar.name}
              </div>
              {pillar.subParameters.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => handleStart(sub.id)}
                  className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-400 transition group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800 group-hover:text-amber-600 transition">{sub.name}</span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-amber-500" />
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{sub.description}</p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Question Node (Wizard Step 2+)
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
         <button onClick={handleBack} className="text-sm text-gray-500 hover:text-gray-900 underline">
           &larr; Back
         </button>
         <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
            {currentPillar?.name} / {currentSubParam?.name}
         </span>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative">
        <div className="h-2 bg-gray-100 w-full">
            <div 
              className="h-full bg-amber-500 transition-all duration-500" 
              style={{ width: `${Math.min((history.length / 5) * 100, 100)}%` }} 
            />
        </div>
        
        <div className="p-8 md:p-12">
           <div className="mb-8 flex justify-center text-amber-500">
              <HelpCircle size={48} />
           </div>
           
           <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10 leading-snug">
             {currentNode?.question}
           </h3>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <button
               onClick={() => handleAnswer(currentNode?.yesNext)}
               className="flex items-center justify-center gap-3 p-5 rounded-xl border-2 border-emerald-100 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 transition group"
             >
                <div className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm">
                   <CheckCircle size={20} />
                </div>
                <span className="text-lg font-semibold text-emerald-900">Yes</span>
             </button>

             <button
               onClick={() => handleAnswer(currentNode?.noNext)}
               className="flex items-center justify-center gap-3 p-5 rounded-xl border-2 border-red-100 bg-red-50 hover:bg-red-100 hover:border-red-300 transition group"
             >
                <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center shadow-sm">
                   <AlertCircle size={20} />
                </div>
                <span className="text-lg font-semibold text-red-900">No</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeTool;