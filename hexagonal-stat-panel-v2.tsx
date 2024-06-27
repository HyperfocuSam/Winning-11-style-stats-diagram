import React, { useState } from 'react';

const StatPanel = () => {
  const [stats, setStats] = useState({
    ATT: 100,
    SPD: 100,
    POW: 100,
    DEF: 100,
    TEC: 100,
    STA: 100,
  });

  const handleStatChange = (stat, value) => {
    setStats(prevStats => ({
      ...prevStats,
      [stat]: parseInt(value)
    }));
  };

  const hexPoints = [
    [50, 0], [100, 25], [100, 75], [50, 100], [0, 75], [0, 25]
  ];

  const statPositions = [
    [50, -15], [115, 25], [115, 75], [50, 115], [-15, 75], [-15, 25]
  ];

  const labelPositions = [
    [50, -25], [130, 25], [130, 75], [50, 125], [-30, 75], [-30, 25]
  ];

  const getPolygonPoints = () => {
    const values = Object.values(stats);
    return hexPoints.map((point, i) => {
      const value = values[i] / 100;
      return [
        50 + (point[0] - 50) * value,
        50 + (point[1] - 50) * value
      ].join(',');
    }).join(' ');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white text-xl mb-4">Customizable Hexagonal Stat Panel</h2>
      <div className="relative w-80 h-80 mb-4">
        <svg viewBox="-40 -40 180 180" className="w-full h-full">
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="#4299e1" strokeWidth="2" />
          <polygon points={getPolygonPoints()} fill="none" stroke="#fc8181" strokeWidth="2" />
          {hexPoints.map((point, i) => (
            <text key={i} x={statPositions[i][0]} y={statPositions[i][1]} 
                  textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="4">
              {stats[Object.keys(stats)[i]]}
            </text>
          ))}
          {Object.keys(stats).map((stat, i) => (
            <text key={stat} x={labelPositions[i][0]} y={labelPositions[i][1]}
                  textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="5" fontWeight="bold">
              {stat}
            </text>
          ))}
        </svg>
      </div>
      <div className="w-full bg-gray-700 p-4 rounded-lg">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center mb-2">
            <label className="text-white font-bold w-10">{stat}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => handleStatChange(stat, e.target.value)}
              className="w-full mx-2"
            />
            <span className="text-white w-8 text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatPanel;
