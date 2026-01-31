import { RemovalGuideline } from './types';
import React from 'react';

// Data extracted manually from the provided photo to ensure 100% accuracy to the source material.
// Left table (Materials) is mapped to Right table (Intervals) where applicable.

export const GUIDELINES: RemovalGuideline[] = [
  // Head & Neck
  { site: 'Scalp', minDays: 6, maxDays: 8, sutureSize: '3/0', category: 'Head/Neck' },
  { site: 'Eyelid', minDays: 5, maxDays: 5, category: 'Head/Neck' },
  { site: 'Face', minDays: 5, maxDays: 5, sutureSize: '6/0', category: 'Head/Neck' },
  { site: 'Ear', minDays: 5, maxDays: 5, category: 'Head/Neck' },
  { site: 'Chin', minDays: 7, maxDays: 8, sutureSize: '6/0', category: 'Head/Neck' },
  { site: 'Neck', minDays: 7, maxDays: 8, sutureSize: '6/0', category: 'Head/Neck' },

  // Torso
  { site: 'Chest/Abdomen', minDays: 8, maxDays: 10, sutureSize: '3/0', category: 'Torso' },
  { site: 'Back', minDays: 12, maxDays: 14, sutureSize: '3/0', category: 'Torso' },

  // Extremities
  { site: 'Arm/Leg', minDays: 8, maxDays: 10, sutureSize: '4/0', category: 'Extremities' },
  { site: 'Hand', minDays: 8, maxDays: 10, category: 'Extremities' },
  { site: 'Finger-tip', minDays: 10, maxDays: 12, sutureSize: '5/0', category: 'Extremities' },
  { site: 'Foot', minDays: 12, maxDays: 14, category: 'Extremities' },
];

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Head/Neck': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'Torso': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  'Extremities': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  ),
};