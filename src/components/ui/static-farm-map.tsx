import React from 'react';

// Simple static map replacement for the farm location
export const StaticFarmMap = () => {
  const FARM_LAT = -28.7041;
  const FARM_LNG = 24.2464;

  const farmAssets = [
    { id: 1, name: "Main Crop Field", type: "Crops", color: "bg-green-500", left: "25%", top: "30%" },
    { id: 2, name: "Livestock Grazing Area", type: "Livestock", color: "bg-blue-500", left: "60%", top: "20%" },
    { id: 3, name: "Water Source", type: "Infrastructure", color: "bg-cyan-500", left: "40%", top: "70%" },
    { id: 4, name: "Storage Facility", type: "Infrastructure", color: "bg-orange-500", left: "70%", top: "60%" },
    { id: 5, name: "Equipment Shed", type: "Infrastructure", color: "bg-purple-500", left: "20%", top: "80%" },
    { id: 6, name: "Secondary Field", type: "Crops", color: "bg-green-400", left: "80%", top: "40%" },
  ];

  // Generate a static map URL using OpenStreetMap tiles
  const mapUrl = `https://tile.openstreetmap.org/16/${Math.floor((FARM_LNG + 180) * (1 << 16) / 360)}/${Math.floor((1 - Math.log(Math.tan(FARM_LAT * Math.PI / 180) + 1 / Math.cos(FARM_LAT * Math.PI / 180)) / Math.PI) / 2 * (1 << 16))}.png`;

  return (
    <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden">
      {/* Background map styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200" />
      
      {/* Farm boundary */}
      <div className="absolute inset-4 border-2 border-dashed border-green-600/60 rounded-lg bg-green-50/30" />
      
      {/* Farm markers */}
      {farmAssets.map((asset) => (
        <div
          key={asset.id}
          className={`absolute w-4 h-4 ${asset.color} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform group`}
          style={{
            left: asset.left,
            top: asset.top,
          }}
          title={`${asset.name} (${asset.type})`}
        >
          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
            {asset.name}
          </div>
        </div>
      ))}
      
      {/* Map controls */}
      <div className="absolute top-2 right-2 bg-white rounded-lg shadow p-2 text-xs">
        <div className="text-muted-foreground">Farm Overview</div>
        <div className="font-mono text-xs mt-1">
          {FARM_LAT.toFixed(4)}°S, {FARM_LNG.toFixed(4)}°E
        </div>
      </div>
      
      {/* Scale indicator */}
      <div className="absolute bottom-2 left-2 bg-white rounded px-2 py-1 text-xs">
        Scale: ~100m
      </div>
    </div>
  );
};