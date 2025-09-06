import React, { useState } from 'react';
import { AdvancedMap } from '@/components/ui/interactive-map';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';

// Farm coordinates (KwaZulu-Natal, Msinga)
const FARM_CENTER: [number, number] = [-28.7282, 30.4319];

// Sample farm data
const farmMarkers = [
  {
    id: 'farm-center',
    position: FARM_CENTER,
    color: 'red',
    size: 'large',
    popup: {
      title: 'Mthunzini Farm',
      content: 'Main farmhouse and operations center',
    }
  },
  {
    id: 'maize-field-1',
    position: [-28.7285, 30.4325] as [number, number],
    color: 'green',
    size: 'medium',
    popup: {
      title: 'Maize Field A',
      content: 'Primary maize cultivation area - 2.5 hectares',
    }
  },
  {
    id: 'sweet-potato-field',
    position: [-28.7275, 30.4310] as [number, number],
    color: 'orange',
    size: 'medium',
    popup: {
      title: 'Sweet Potato Field',
      content: 'Sweet potato cultivation - 1.2 hectares',
    }
  },
  {
    id: 'cattle-area',
    position: [-28.7290, 30.4330] as [number, number],
    color: 'blue',
    size: 'medium',
    popup: {
      title: 'Cattle Grazing Area',
      content: 'Main pasture for cattle herd',
    }
  },
  {
    id: 'goat-pen',
    position: [-28.7270, 30.4315] as [number, number],
    color: 'purple',
    size: 'small',
    popup: {
      title: 'Goat Enclosure',
      content: 'Secure area for goat herd',
    }
  },
  {
    id: 'gps-collar-1',
    position: [-28.7288, 30.4328] as [number, number],
    color: 'yellow',
    size: 'small',
    popup: {
      title: 'GPS Collar - Cattle 001',
      content: 'Active GPS tracker - Last update: 5 min ago',
    }
  },
  {
    id: 'soil-sensor-1',
    position: [-28.7283, 30.4322] as [number, number],
    color: 'black',
    size: 'small',
    popup: {
      title: 'Soil Sensor',
      content: 'Temperature: 24°C, Moisture: 68%',
    }
  }
];

// Farm boundary polygon
const farmBoundary = [
  {
    id: 'farm-boundary',
    positions: [
      [-28.7265, 30.4300],
      [-28.7265, 30.4340],
      [-28.7300, 30.4340],
      [-28.7300, 30.4300]
    ] as [number, number][],
    style: { color: '#22c55e', weight: 3, fillOpacity: 0.1 },
    popup: 'Mthunzini Farm Boundary - 25 hectares'
  }
];

interface FarmMapProps {
  isCompact?: boolean;
  className?: string;
}

export const FarmMap: React.FC<FarmMapProps> = ({ isCompact = false, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mapStyle = isCompact 
    ? { height: '192px', width: '100%' }
    : { height: '600px', width: '100%' };

  const mapProps = {
    center: FARM_CENTER,
    zoom: isCompact ? 14 : 15,
    markers: farmMarkers,
    polygons: farmBoundary,
    enableClustering: !isCompact,
    enableSearch: !isCompact,
    enableControls: !isCompact,
    style: mapStyle,
    className
  };

  if (isCompact) {
    return (
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer group">
            <AdvancedMap {...mapProps} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Expand Map
              </Button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-6xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Farm Location - Interactive Map</DialogTitle>
          </DialogHeader>
          <div className="h-full">
            <AdvancedMap
              center={FARM_CENTER}
              zoom={15}
              markers={farmMarkers}
              polygons={farmBoundary}
              enableClustering={true}
              enableSearch={true}
              enableControls={true}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <AdvancedMap {...mapProps} />;
};