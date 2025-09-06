import React, { useState } from 'react';
import { AdvancedMap } from "@/components/ui/interactive-map";

export const MapDemo: React.FC = () => {
  const [markers] = useState([
    {
      id: 1,
      position: [-26.2041, 28.0473] as [number, number], // Johannesburg
      color: 'blue',
      size: 'medium' as const,
      popup: {
        title: 'Main Farm',
        content: 'Primary farming location with crops and livestock',
      }
    },
    {
      id: 2,
      position: [-26.1951, 28.0567] as [number, number], // Nearby location
      color: 'green',
      size: 'large' as const,
      popup: {
        title: 'Equipment Storage',
        content: 'Farm equipment and machinery storage facility'
      }
    },
    {
      id: 3,
      position: [-26.2131, 28.0389] as [number, number], // Another nearby location
      color: 'orange',
      size: 'small' as const,
      popup: {
        title: 'Weather Station',
        content: 'Automated weather monitoring station'
      }
    }
  ]);

  const polygons = [
    {
      id: 1,
      positions: [
        [-26.2000, 28.0400],
        [-26.2100, 28.0500],
        [-26.2100, 28.0600],
        [-26.2000, 28.0500]
      ] as [number, number][],
      style: { color: 'green', weight: 2, fillOpacity: 0.4 },
      popup: 'Crop Field A - Maize'
    },
    {
      id: 2,
      positions: [
        [-26.1950, 28.0350],
        [-26.2050, 28.0450],
        [-26.2050, 28.0550],
        [-26.1950, 28.0450]
      ] as [number, number][],
      style: { color: 'yellow', weight: 2, fillOpacity: 0.4 },
      popup: 'Crop Field B - Sunflowers'
    }
  ];

  const circles = [
    {
      id: 1,
      center: [-26.2041, 28.0473] as [number, number],
      radius: 1000, // 1km radius
      style: { color: 'blue', fillOpacity: 0.2 },
      popup: 'Farm monitoring radius (1km)'
    }
  ];

  const handleMarkerClick = (marker: any) => {
    console.log('Marker clicked:', marker);
  };

  const handleMapClick = (latlng: any) => {
    console.log('Map clicked at:', latlng);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Farm Location Interactive Map</h1>
        <p className="text-muted-foreground mb-6">
          Explore farm locations, crop fields, and equipment positions with our interactive mapping system.
        </p>
        
        <div className="rounded-lg overflow-hidden shadow-lg border">
          <AdvancedMap
            center={[-26.2041, 28.0473]} // Johannesburg
            zoom={14}
            markers={markers}
            polygons={polygons}
            circles={circles}
            onMarkerClick={handleMarkerClick}
            onMapClick={handleMapClick}
            enableClustering={true}
            enableSearch={true}
            enableControls={true}
            style={{ height: '600px', width: '100%' }}
          />
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold text-primary mb-2">🌾 Crop Fields</h3>
            <p className="text-sm text-muted-foreground">
              View field boundaries and crop types across your farm property.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold text-primary mb-2">📍 Equipment Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor locations of farm equipment and livestock GPS collars.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-semibold text-primary mb-2">🛰️ Satellite View</h3>
            <p className="text-sm text-muted-foreground">
              Switch between standard and satellite imagery for detailed views.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};