import React, { useState, useMemo } from 'react';
import Calculator from './components/Calculator';
import ResultCard from './components/ResultCard';
import ReferenceTable from './components/ReferenceTable';
import HolidayCalendar from './components/HolidayCalendar';
import { GUIDELINES } from './constants';
import { CalculationResult } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'reference'>('calculator');
  
  // Lifted state: Single source of truth for the calculator inputs
  const [sutureDate, setSutureDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [selectedSite, setSelectedSite] = useState<string>('');

  // Derived state: Result is calculated immediately when inputs change
  const result = useMemo<CalculationResult | null>(() => {
    if (!sutureDate || !selectedSite) return null;
    
    const guideline = GUIDELINES.find(g => g.site === selectedSite);
    if (!guideline) return null;

    // Use noon to avoid timezone rollover issues
    const dateObj = new Date(sutureDate);
    dateObj.setHours(12, 0, 0, 0);

    const removalStartDate = new Date(dateObj);
    removalStartDate.setDate(dateObj.getDate() + guideline.minDays);

    const removalEndDate = new Date(dateObj);
    removalEndDate.setDate(dateObj.getDate() + guideline.maxDays);

    return { removalStartDate, removalEndDate, guideline };
  }, [sutureDate, selectedSite]);

  return (
    <div className="min-h-screen flex flex-col text-brand-ink bg-brand-pale/50">
      {/* Header */}
      <header className="bg-white border-b border-brand-light/30 shadow-sm sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setActiveTab('calculator')}
            >
                <svg viewBox="0 0 24 24" className="h-10 w-10 drop-shadow-sm" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                   <g className="text-brand-dark">
                      <path d="M10.5 19a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0z" strokeWidth="1.5" />
                      <path d="M18.5 19a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0z" strokeWidth="1.5" />
                      <path d="M8 16.5L12 11L13.5 7" strokeWidth="2" />
                      <path d="M16 16.5L12 11L10.5 7" strokeWidth="2" />
                      <circle cx="12" cy="11" r="0.8" fill="currentColor" className="text-brand-dark" />
                   </g>
                   <path d="M 7 6 C 7 1, 17 1, 17 6" className="text-brand-orange" strokeWidth="2.5" />
                   <path d="M 17 6 C 18 6, 20 8, 21 11" className="text-brand-light" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>

                <h1 className="text-xl font-bold tracking-tight text-brand-dark hidden sm:block">
                  Suture<span className="text-brand-orange">Track</span>
                </h1>
            </div>

            <nav className="flex items-center p-1 bg-brand-pale rounded-lg border border-brand-light/40">
                {['calculator', 'reference'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 capitalize ${
                        activeTab === tab 
                        ? 'bg-white text-brand-orange shadow-sm ring-1 ring-black/5 font-semibold' 
                        : 'text-brand-dark/70 hover:text-brand-dark hover:bg-white/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
            </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'calculator' ? (
            <>
                <div className="text-center mb-10 max-w-2xl mx-auto animate-fadeIn">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mb-4">Removal Date Calculator</h2>
                    <p className="text-brand-dark/80">
                        Easily determine the recommended interval for stitch removal based on anatomical sites.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start animate-slideUp">
                    <div className="w-full">
                        <Calculator 
                          date={sutureDate} 
                          setDate={setSutureDate} 
                          site={selectedSite} 
                          setSite={setSelectedSite} 
                        />
                    </div>
                    <div className="w-full md:sticky md:top-24">
                        <ResultCard result={result} />
                    </div>
                </div>

                <div className="mt-16 pt-10 border-t border-brand-light/30 animate-slideUp">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-brand-ink">Public Holiday Calendar</h2>
                        <p className="text-brand-dark/70 mt-2">Check for Sundays and Public Holidays (Hong Kong)</p>
                    </div>
                    <HolidayCalendar />
                </div>
            </>
        ) : (
            <ReferenceTable />
        )}
      </main>

      <footer className="bg-white border-t border-brand-light/30 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-brand-dark/60">
            <p>&copy; {new Date().getFullYear()} SutureTrack Utility.</p>
            <p className="mt-2 md:mt-0">For reference only. Follow specific doctor's orders.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;