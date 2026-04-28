/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

// Mock state for the dashboard
interface DashboardState {
  goal: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  realityClass: 'DETERMINISTIC' | 'ADAPTIVE' | 'INVALID';
  confidence: number;
  logs: Array<{ timestamp: string; message: string; type: 'info' | 'error' | 'success' }>;
}

export default function App() {
  const [state, setState] = useState<DashboardState>({
    goal: "Scaffold a production-ready GCP cluster with reality-anchored cost monitoring.",
    status: 'running',
    realityClass: 'DETERMINISTIC',
    confidence: 0.998,
    logs: [
      { timestamp: '14:02:11', message: 'GPT generated Plan_ID_A23.', type: 'info' },
      { timestamp: '14:02:22', message: 'Reality Match: 100%.', type: 'success' },
    ]
  });

  // Effect to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate adding a log entry
      setState(prev => ({
        ...prev,
        confidence: Math.max(0, Math.min(1, prev.confidence + (Math.random() - 0.5) * 0.01)),
        logs: [...prev.logs, { 
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }), 
          message: `Engine tick: verifying system state...`, 
          type: 'info' 
        }].slice(-5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#09090B] text-[#E4E4E7] min-h-screen flex flex-col font-sans border-8 border-[#18181B] overflow-hidden">
      {/* Top Navigation / Status Bar */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#27272A] bg-[#09090B]">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 ${state.status === 'running' ? 'bg-[#10B981]' : 'bg-red-500'} rounded-full shadow-[0_0_8px_#10B981]`}></div>
          <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-[#A1A1AA]">GPT-Anchor-Orchestrator / v1.0.42</h1>
        </div>
        <div className="flex gap-8 text-[10px] font-mono tracking-wider">
          <div className="flex flex-col">
            <span className="text-[#71717A]">REALITY ANCHOR</span>
            <span className={state.realityClass === 'INVALID' ? 'text-red-500' : 'text-[#10B981]'}>{state.realityClass}: ACTIVE</span>
          </div>
          <div className="flex flex-col border-l border-[#27272A] pl-8">
            <span className="text-[#71717A]">SYSTEM LOAD</span>
            <span>14.2%</span>
          </div>
          <div className="flex flex-col border-l border-[#27272A] pl-8">
            <span className="text-[#71717A]">UPTIME</span>
            <span>247:12:04</span>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        
        {/* LEFT PANEL: Goal & Planner */}
        <section className="col-span-3 border-r border-[#27272A] p-6 flex flex-col gap-6 bg-[#0C0C0E]">
          <div>
            <label className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest block mb-3">Current Goal</label>
            <div className="bg-[#18181B] p-4 border-l-2 border-[#3B82F6]">
              <p className="text-sm leading-relaxed italic text-white">"{state.goal}"</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest block mb-3">GPT Planner Decompostion</label>
          </div>

          <div className="mt-auto">
            <div className="h-2 w-full bg-[#18181B] rounded-full overflow-hidden">
              <div className="h-full w-[45%] bg-[#3B82F6]"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-mono">
              <span className="text-[#71717A]">PHASE: {state.status.toUpperCase()}</span>
              <span>45% COMPLETE</span>
            </div>
          </div>
        </section>

        {/* CENTER PANEL: Execution Loop Visualization */}
        <section className="col-span-6 border-x border-[#27272A] p-8 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="relative w-[400px] h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 border border-[#27272A] rounded-full"></div>
            
            <div className="z-10 w-48 h-48 bg-[#09090B] border-2 border-[#3B82F6] rounded-full flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] text-[#3B82F6] font-mono tracking-tighter">AUTONOMOUS_LOOP</span>
              <h2 className="text-xl font-light text-white tracking-tight">ENGINE.TS</h2>
              <div className={`mt-2 px-2 py-1 ${state.status === 'running' ? 'bg-[#10B98122] text-[#10B981]' : 'bg-red-900 text-red-100'} text-[9px] border border-[#10B98144] rounded`}>
                {state.status.toUpperCase()}_ORBIT
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Reality Logs & Evidence */}
        <section className="col-span-3 p-6 flex flex-col bg-[#09090B]">
          <label className="text-[10px] font-bold text-[#71717A] uppercase tracking-widest block mb-4">Audit Evidence Log</label>
          
          <div className="flex-1 overflow-hidden space-y-4 font-mono">
            {state.logs.map((log, index) => (
              <div key={index} className="border-l border-[#27272A] pl-4 py-1">
                <div className="text-[9px] text-[#71717A]">{log.timestamp} - {log.type.toUpperCase()}</div>
                <div className={`text-[11px] ${log.type === 'error' ? 'text-red-500' : 'text-[#A1A1AA]'}`}>{log.message}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#18181B] border border-[#27272A] p-4">
            <div className="flex items-center justify-between text-[10px] mb-2">
              <span className="text-[#71717A]">CONFIDENCE SCORE</span>
              <span className="text-white font-mono">{state.confidence.toFixed(3)}</span>
            </div>
            <div className="w-full h-1 bg-[#09090B] rounded-full">
              <div className="h-full bg-[#10B981]" style={{ width: `${state.confidence * 100}%` }}></div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Control Bar */}
      <footer className="h-16 border-t border-[#27272A] flex items-center justify-between px-8 bg-[#0C0C0E]">
        <div className="flex gap-4">
          <button className="px-4 py-1 bg-[#3B82F6] text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-blue-600">Start Autonomy</button>
        </div>
      </footer>
    </div>
  );
}

