import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, GitFork, ClipboardList, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import FrameworkExplorer from './components/FrameworkExplorer';
import DecisionTreeTool from './components/DecisionTreeTool';
import ScoringGuide from './components/ScoringGuide';
import { APP_NAME } from './constants';

type View = 'dashboard' | 'framework' | 'decision-tree' | 'scoring';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'framework', label: 'R.I.D.E. Framework', icon: BookOpen },
    { id: 'decision-tree', label: 'Decision Tree Tool', icon: GitFork },
    { id: 'scoring', label: 'Scoring Guide', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
                <h1 className="font-bold text-xl tracking-tight text-gray-900">CX Trainer</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as View);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  currentView === item.id 
                    ? 'bg-amber-50 text-amber-700 shadow-sm ring-1 ring-amber-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} className={currentView === item.id ? 'text-amber-600' : 'text-gray-400'} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-100">
            <div className="bg-gray-900 rounded-xl p-4 text-white">
                <h4 className="text-sm font-bold mb-1">VP Insight</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                    "Make every conversation a smooth, reliable ride."
                </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between lg:hidden sticky top-0 z-10">
           <div className="font-bold text-lg">{APP_NAME}</div>
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600">
             <Menu size={24} />
           </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'framework' && <FrameworkExplorer />}
            {currentView === 'decision-tree' && <DecisionTreeTool />}
            {currentView === 'scoring' && <ScoringGuide />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;