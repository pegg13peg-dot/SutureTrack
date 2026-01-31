export interface RemovalGuideline {
  site: string;
  minDays: number;
  maxDays: number; // If single day (e.g. 5), min and max are equal
  sutureSize?: string; // Derived from the left table in the photo
  category: 'Head/Neck' | 'Torso' | 'Extremities';
}

export interface CalculationResult {
  removalStartDate: Date;
  removalEndDate: Date;
  guideline: RemovalGuideline;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}