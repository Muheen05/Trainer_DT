import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { TAGLINE } from '../constants';

const data = [
  { name: 'Reopens', before: 12, after: 5 },
  { name: 'CSAT', before: 3.8, after: 4.6 },
  { name: 'SOP Adh.', before: 85, after: 98 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">R.I.D.E. CX Framework</h1>
          <p className="text-xl text-amber-400 font-medium mb-6 italic">"{TAGLINE}"</p>
          <div className="max-w-2xl text-gray-300 space-y-2">
             <p>Elevating quality and consistency in every customer interaction. This framework targets key areas influencing CSAT, repeat contacts, and operational efficiency.</p>
          </div>
        </div>
      </div>

      {/* Key Metrics / "The Why" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4"><TrendingUp size={24} /></div>
          <h3 className="font-bold text-gray-900">Reduce Reopens</h3>
          <p className="text-sm text-gray-500 mt-2">Targeting first contact resolution through accurate identification.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4"><Users size={24} /></div>
          <h3 className="font-bold text-gray-900">Improve CSAT</h3>
          <p className="text-sm text-gray-500 mt-2">Building trust via emotional acknowledgment and human closure.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-full mb-4"><Target size={24} /></div>
          <h3 className="font-bold text-gray-900">SOP Alignment</h3>
          <p className="text-sm text-gray-500 mt-2">Ensuring standardized, predictable high-quality support.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-full mb-4"><ShieldCheck size={24} /></div>
          <h3 className="font-bold text-gray-900">Predictability</h3>
          <p className="text-sm text-gray-500 mt-2">Creating a consistent, reliable "ride" for every customer.</p>
        </div>
      </div>

      {/* Impact Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Projected Impact</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="before" name="Current State" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="Goal State" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-300"></div> Current State</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Goal State</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;