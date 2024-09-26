import React from 'react';

const ReportFactors = ({ factors }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Factors Impacting Lifespan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factors.map((factor, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-gray-700 font-semibold">{factor.factor}</p>
            <p className={`text-${factor.impact < 0 ? 'red' : 'green'}-500`}>
              Impact: {factor.impact} years
            </p>
            <p className="text-gray-500">Percentage of Impact: {factor.percentage_of_full_impact}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportFactors;
