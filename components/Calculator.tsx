import React from 'react';
import { GUIDELINES, CATEGORY_ICONS } from '../constants';

interface CalculatorProps {
  date: string;
  setDate: (date: string) => void;
  site: string;
  setSite: (site: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ date, setDate, site, setSite }) => {
  const categories = ['Head/Neck', 'Torso', 'Extremities'];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-brand-light/30">
      <h2 className="text-xl font-semibold text-brand-ink mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Suture Details
      </h2>

      <div className="space-y-8">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-brand-dark mb-2">
            Date of Procedure
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-3 rounded-lg border border-brand-light/50 focus:ring-2 focus:ring-brand-light focus:border-brand-light text-brand-ink bg-brand-pale/20"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-4">
            Anatomical Site Selection
          </label>
          
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category} className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-3 text-brand-light px-1">
                   <div className="text-brand-dark">{CATEGORY_ICONS[category]}</div>
                   <span className="text-xs font-bold uppercase tracking-wider text-brand-dark/70">{category}</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                   {GUIDELINES.filter(g => g.category === category).map(item => {
                     const isSelected = site === item.site;
                     return (
                      <button
                        key={item.site}
                        onClick={() => setSite(item.site)}
                        className={`
                          relative px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border text-center flex items-center justify-center min-h-[50px]
                          ${isSelected 
                            ? 'bg-brand-orange border-brand-orange text-white shadow-md shadow-brand-orange/30 ring-2 ring-brand-light scale-[1.02]' 
                            : 'bg-white border-brand-light/40 text-brand-ink hover:border-brand-orange/50 hover:bg-brand-pale hover:text-brand-orange'
                          }
                        `}
                      >
                        {item.site}
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                     );
                   })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;