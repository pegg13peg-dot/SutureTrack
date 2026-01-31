import React, { useState } from 'react';
import { checkIsHoliday } from '../services/holidayService';

const HolidayCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const today = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const changeMonth = (offset: number) => setDate(new Date(year, month + offset, 1));

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-brand-light/30 overflow-hidden mb-6">
        <div className="bg-brand-pale/30 border-b border-brand-light/30 p-4 flex items-center justify-between">
          <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-brand-pale rounded-full text-brand-dark">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </button>
          <h3 className="font-bold text-brand-ink text-lg">{date.toLocaleString('default', { month: 'long' })} {year}</h3>
          <button onClick={() => changeMonth(1)} className="p-1 hover:bg-brand-pale rounded-full text-brand-dark">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 border-b border-brand-light/30">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
            <div key={d} className={`text-center py-2 text-xs font-semibold uppercase tracking-wider ${i === 0 ? 'text-brand-orange' : 'text-brand-dark/60'}`}>{d}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 bg-white">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="h-10 md:h-14" />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const current = new Date(year, month, d);
            const { isHoliday, reason } = checkIsHoliday(current);
            const isRed = isHoliday || current.getDay() === 0;
            const isPublic = isHoliday && current.getDay() !== 0;
            const isToday = current.getDate() === today.getDate() && 
                            current.getMonth() === today.getMonth() && 
                            current.getFullYear() === today.getFullYear();

            return (
              <div key={d} className={`h-10 md:h-14 border border-brand-light/30 flex flex-col items-center justify-start py-1 relative group ${isRed ? 'bg-brand-orange/10 hover:bg-brand-orange/20' : 'hover:bg-brand-pale'}`}>
                <span className={`text-sm font-medium z-10 ${
                  isToday 
                    ? 'bg-brand-dark text-white w-7 h-7 flex items-center justify-center rounded-full shadow-sm' 
                    : (isRed ? 'text-brand-orange font-bold' : 'text-brand-ink')
                }`}>
                  {d}
                </span>
                {isPublic && (
                  <>
                    <div className="hidden group-hover:flex absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-brand-ink text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                      {reason}<div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand-ink"/>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1"></div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-4">
        <a 
          href="https://www.gov.hk/en/about/abouthk/holiday/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1.5 text-xs text-brand-dark hover:text-brand-orange transition-colors font-medium border-b border-brand-dark/20 hover:border-brand-orange"
        >
          <span>Verify with GovHK (Gazetted Public Holidays)</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HolidayCalendar;