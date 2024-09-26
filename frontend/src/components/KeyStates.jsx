import React from 'react';
import lifeSpanImage from '../images/lifespan.jpg'
import ageImage from '../images/age.jpg'
import genderImage from '../images/gender.jpg'

const KeyStats = ({ change_in_age, estimated_lifespan, gender }) => {
  const genderText = gender === 0 ? "Male" : "Female";

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src= {lifeSpanImage} alt="lifespan" className="w-12 h-12 mr-4" />
          <p className="text-gray-700">Estimated Lifespan: <span className="font-bold">{estimated_lifespan} years</span></p>
        </div>
        <div className="flex items-center">
          <img src={ageImage} alt="age impact" className="w-12 h-12 mr-4" />
          <p className="text-gray-700">Change in Age: <span className="font-bold">{change_in_age} years</span></p>
        </div>
        <div className="flex items-center">
          <img src={genderImage} alt="gender" className="w-12 h-12 mr-4" />
          <p className="text-gray-700">Gender: <span className="font-bold">{genderText}</span></p>
        </div>
      </div>
    </div>
  );
};

export default KeyStats;
