import React from 'react';

const StatCard = ({ title, value, icon: Icon, bgColor, textColor }) => (
  <div className={`p-4 rounded-lg shadow-sm ${bgColor} ${textColor}`}>
    <div className="flex items-center">
      <Icon className="mr-3" size={24} />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default StatCard;
