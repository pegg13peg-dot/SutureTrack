import Holidays from 'date-holidays';

// Initialize the holiday calendar for Hong Kong
// This library dynamically calculates holidays for past and future years,
// including complex Lunar and Easter based dates.
// @ts-ignore
const hd = new Holidays('HK');

// Specific manual overrides for complex substitution rules that the library might miss
// or for future gazetted holidays not yet in the library version.
const MANUAL_HOLIDAYS: Record<string, string> = {
  '2026-04-07': 'The day following Easter Monday (Substitution for Ching Ming Festival)'
};

export interface HolidayCheck {
  isHoliday: boolean;
  reason?: string;
}

export const checkIsHoliday = (date: Date): HolidayCheck => {
  // 1. Check Manual Overrides first (using YYYY-MM-DD string)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  if (MANUAL_HOLIDAYS[dateString]) {
    return { isHoliday: true, reason: MANUAL_HOLIDAYS[dateString] };
  }

  // 2. Check for Sunday (0)
  if (date.getDay() === 0) {
    return { isHoliday: true, reason: "Sunday" };
  }

  // 3. Check for Public Holiday using date-holidays library
  // isHoliday returns an array of holidays on that day, or false/null
  const holidayResult = hd.isHoliday(date);
  
  if (holidayResult) {
    // It returns a single object or array of objects.
    const holiday = Array.isArray(holidayResult) ? holidayResult[0] : holidayResult;
    
    // Filter out 'optional' or non-public if necessary, but 'HK' profile usually only has public.
    // Ensure the type is 'public' or 'bank' (HK General Holidays are effectively bank holidays)
    if (holiday.type === 'public' || holiday.type === 'bank') {
        return { isHoliday: true, reason: holiday.name };
    }
  }

  return { isHoliday: false };
};

export const getNextWorkingDay = (date: Date): Date => {
  const nextDate = new Date(date);
  // Increase lookahead to avoid issues with long holiday streaks (like LNY + Sun)
  for (let i = 0; i < 30; i++) {
    nextDate.setDate(nextDate.getDate() + 1);
    if (!checkIsHoliday(nextDate).isHoliday) {
      return nextDate;
    }
  }
  return nextDate;
};