import React from 'react';
import { GUIDELINES, CATEGORY_ICONS } from '../constants';

const ReferenceTable: React.FC = () => {
  const categories = ['Head/Neck', 'Torso', 'Extremities'];

  return (
    <div className="w-full animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-ink">Clinical Guidelines Reference</h2>
        <p className="text-brand-dark/70 mt-2">Standard protocols for suture materials and recommended removal timing</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-brand-light/30 overflow-hidden max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-brand-pale text-brand-dark font-semibold uppercase tracking-wider text-xs border-b border-brand-light/30">
              <tr>
                <th className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">Anatomical Site</th>
                <th className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">Rec. Suture Size</th>
                <th className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">Removal Interval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-light/20">
              {categories.map(category => {
                const categoryItems = GUIDELINES.filter(g => g.category === category);
                return (
                  <React.Fragment key={category}>
                    <tr className="bg-brand-pale/50">
                      <td colSpan={3} className="px-3 py-2 md:px-6 md:py-3 font-bold text-brand-dark border-y border-brand-light/20">
                        <div className="flex items-center gap-2">
                            <span className="text-brand-orange">{CATEGORY_ICONS[category]}</span>
                            {category}
                        </div>
                      </td>
                    </tr>
                    {categoryItems.map((item) => (
                      <tr key={item.site} className="hover:bg-brand-pale/30 transition-colors group">
                        <td className="px-3 py-3 md:px-6 md:py-4 font-medium text-brand-ink whitespace-nowrap">{item.site}</td>
                        <td className="px-3 py-3 md:px-6 md:py-4 text-brand-dark/70 font-mono text-xs whitespace-nowrap">
                          {item.sutureSize && (
                            <span className="bg-brand-pale px-1.5 py-0.5 md:px-2 md:py-1 rounded text-brand-dark border border-brand-light/30 group-hover:border-brand-light group-hover:bg-white transition-colors block w-fit">
                                Size {item.sutureSize}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 md:px-6 md:py-4 text-brand-dark/80 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-light/20 text-brand-dark border border-brand-light/30">
                            {item.minDays === item.maxDays ? item.minDays : `${item.minDays} - ${item.maxDays}`} days
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-brand-pale/30 border-t border-brand-light/30 text-xs text-brand-dark/70 text-center font-medium italic">
          *** In pediatric patient, use of smaller size of appropriate suture material is justified in respective site.
        </div>
      </div>
    </div>
  );
};

export default ReferenceTable;