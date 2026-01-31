import React from 'react';
import { CalculationResult } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { checkIsHoliday, getNextWorkingDay } from '../services/holidayService';

const ResultCard: React.FC<{ result: CalculationResult | null }> = ({ result }) => {
  if (!result) {
    return (
      <div className="h-full bg-brand-pale/30 rounded-2xl border-2 border-dashed border-brand-light/40 flex flex-col items-center justify-center p-8 text-brand-light min-h-[400px]">
        <svg className="h-12 w-12 mb-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-center text-brand-dark/50 font-medium">Select a date and site.</p>
      </div>
    );
  }

  const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' });
  const isSameDay = result.guideline.minDays === result.guideline.maxDays;
  const startCheck = checkIsHoliday(result.removalStartDate);
  const endCheck = checkIsHoliday(result.removalEndDate);

  const DateRow = ({ date, check, label, days }: { date: Date, check: any, label: string, days: number }) => {
    if (!check.isHoliday) {
      return (
        <div className="flex flex-col xl:flex-row xl:justify-between items-center xl:items-baseline border-b border-white/10 pb-3 last:border-0">
          <span className="text-sky-200 text-sm font-medium mb-1 xl:mb-0">{label}:</span>
          <span className="text-xl font-bold tracking-tight text-white">
            {formatDate(date)} <span className="ml-2 text-base font-medium text-sky-200/70">(Day {days})</span>
          </span>
        </div>
      );
    }
    const nextWorking = getNextWorkingDay(date);
    const newDays = days + Math.round((nextWorking.getTime() - date.getTime()) / (86400000));

    return (
      <div className="flex flex-col border-b border-white/10 pb-4 last:border-0">
        <div className="flex flex-col xl:flex-row xl:justify-between items-center xl:items-baseline mb-2">
          <span className="text-sky-200 text-sm font-medium mb-1 xl:mb-0">{label}:</span>
          <span className="text-xl font-bold tracking-tight opacity-60 line-through decoration-brand-orange decoration-2 text-white/70">
            {formatDate(date)} <span className="ml-2 text-base font-medium text-white/50 no-underline">(Day {days})</span>
          </span>
        </div>
        <div className="bg-white/10 border border-brand-orange/30 rounded-lg p-3 text-sm animate-fadeIn shadow-sm flex items-start gap-2">
           <svg className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
           </svg>
           <div>
             <p className="text-white font-medium leading-tight mb-1">Falls on {check.reason}</p>
             <p className="text-sky-100 font-bold">Recommended: {formatDate(nextWorking)} <span className="ml-1 text-sky-200 font-medium">(Day {newDays})</span></p>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-brand-dark rounded-2xl shadow-xl p-6 md:p-8 text-white relative overflow-hidden h-full flex flex-col border border-brand-dark">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm text-brand-light">
           {CATEGORY_ICONS[result.guideline.category]} <span>{result.guideline.category}</span>
        </div>
        {result.guideline.sutureSize && <div className="text-sm bg-brand-light/10 px-3 py-1 rounded-full border border-brand-light/20 text-brand-pale">Size {result.guideline.sutureSize}</div>}
      </div>

      <h3 className="text-3xl font-bold mb-1 text-white relative z-10">{result.guideline.site}</h3>
      <p className="text-brand-light mb-8 text-lg relative z-10">Recommended Interval: {result.guideline.minDays}{!isSameDay && `-${result.guideline.maxDays}`} days</p>

      <div className="bg-[#0c4a6e] rounded-xl p-6 border border-white/10 flex-1 flex flex-col justify-center min-h-[160px] shadow-sm relative z-10">
        <p className="text-sm text-sky-200 uppercase tracking-wider font-bold mb-6 text-center">Target Removal Period</p>
        <div className="space-y-4">
          <DateRow date={result.removalStartDate} check={startCheck} label={isSameDay ? "Recommended date" : "Earliest date"} days={result.guideline.minDays} />
          {!isSameDay && (
            <>
              {!startCheck.isHoliday && !endCheck.isHoliday && <div className="border-t border-white/10 my-1"></div>}
              <DateRow date={result.removalEndDate} check={endCheck} label="Latest date" days={result.guideline.maxDays} />
            </>
          )}
        </div>
      </div>
      <div className="mt-6 text-xs text-brand-light/60 text-center relative z-10">
          * Assess wound healing before removal. Consult a doctor if unsure.<br/>* Holidays calculated for Hong Kong.
      </div>
    </div>
  );
};

export default ResultCard;