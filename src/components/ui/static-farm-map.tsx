import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Satellite, Navigation } from 'lucide-react';

// Simple static map replacement for the farm location
export const StaticFarmMap = () => {
  const FARM_LAT = -28.7041;
  const FARM_LNG = 24.2464;
  const [viewMode, setViewMode] = useState<'satellite' | 'terrain'>('satellite');
  const [zoomLevel, setZoomLevel] = useState(15);

  const farmAssets = [
    { id: 1, name: "Main Crop Field", type: "Crops", color: "bg-green-500", left: "25%", top: "30%" },
    { id: 2, name: "Livestock Grazing Area", type: "Livestock", color: "bg-blue-500", left: "60%", top: "20%" },
    { id: 3, name: "Water Source", type: "Infrastructure", color: "bg-cyan-500", left: "40%", top: "70%" },
    { id: 4, name: "Storage Facility", type: "Infrastructure", color: "bg-orange-500", left: "70%", top: "60%" },
    { id: 5, name: "Equipment Shed", type: "Infrastructure", color: "bg-purple-500", left: "20%", top: "80%" },
    { id: 6, name: "Secondary Field", type: "Crops", color: "bg-green-400", left: "80%", top: "40%" },
  ];

  // Google Maps Static API URL
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${FARM_LAT},${FARM_LNG}&zoom=${zoomLevel}&size=800x320&maptype=${viewMode}&markers=color:red%7C${FARM_LAT},${FARM_LNG}&key=AIzaSyBocZLZokRJhbYCUxVeVl8YFr7HE0VLc_U`;

  return (
    <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden">
      {/* Real Google Maps background */}
      <img 
        src={mapUrl} 
        alt="Farm satellite view"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          // Fallback to gradient background if map fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
      
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200" />
      
      {/* Farm boundary overlay */}
      <div className="absolute inset-4 border-2 border-dashed border-white/80 rounded-lg bg-white/10 backdrop-blur-sm" />
      
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
      <div className="absolute top-2 right-2 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setViewMode(viewMode === 'satellite' ? 'terrain' : 'satellite')}
          className="bg-white/90 backdrop-blur-sm"
        >
          {viewMode === 'satellite' ? <Navigation className="w-4 h-4" /> : <Satellite className="w-4 h-4" />}
        </Button>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-2 text-xs">
          <div className="text-muted-foreground">Farm Overview</div>
          <div className="font-mono text-xs mt-1">
            {FARM_LAT.toFixed(4)}°S, {FARM_LNG.toFixed(4)}°E
          </div>
        </div>
      </div>
      
      {/* Zoom controls */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}
          className="bg-white/90 backdrop-blur-sm w-8 h-8 p-0"
        >
          +
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setZoomLevel(Math.max(12, zoomLevel - 1))}
          className="bg-white/90 backdrop-blur-sm w-8 h-8 p-0"
        >
          −
        </Button>
      </div>
      
      {/* Scale indicator */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs">
        Scale: ~{zoomLevel >= 16 ? '50' : zoomLevel >= 14 ? '100' : '200'}m
      </div>
    </div>
  );
};