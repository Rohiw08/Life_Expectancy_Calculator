import React from 'react';
import ReportFactors from '../components/ReportFactor.jsx';
import KeyStats from '../components/KeyStates.jsx';
import Navbar from '@/components/Navbar.jsx';  // The correct import

function ReportScreen({ reportData }) {
  // Ensure reportData is available before rendering
  if (!reportData) {
    return <div>Loading report...</div>;
  }

  return (
   <> 
    <Navbar />  {/* Correct capitalization */}
    <div className="min-h-screen bg-gray-100 p-6 pt-16">
      <h1 className="text-3xl font-bold text-center text-blue-600">Lifespan Report</h1>
      <KeyStats 
        change_in_age={reportData.change_in_age} 
        estimated_lifespan={reportData.estimated_lifespan} 
        gender={reportData.gender} 
      />
      <ReportFactors factors={reportData.factors} />
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Recommendation</h2>
        <p className="text-gray-700 mt-2">{reportData.recommendation}</p>
      </div>
    </div>
    </>
  );
}

export default ReportScreen;
