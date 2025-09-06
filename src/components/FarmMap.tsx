import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Maximize2, MapPin, Satellite, Navigation } from 'lucide-react';

// Farm coordinates (KwaZulu-Natal, Msinga)
const FARM_LAT = -28.7282;
const FARM_LNG = 30.4319;

// Sample farm markers
const farmMarkers = [
  { id: 'farm-center', name: 'Mthunzini Farm', type: 'farm', color: 'bg-red-500' },
  { id: 'maize-field', name: 'Maize Field A', type: 'crop', color: 'bg-green-500' },
  { id: 'sweet-potato', name: 'Sweet Potato Field', type: 'crop', color: 'bg-orange-500' },
  { id: 'cattle-area', name: 'Cattle Grazing', type: 'livestock', color: 'bg-blue-500' },
  { id: 'goat-pen', name: 'Goat Enclosure', type: 'livestock', color: 'bg-purple-500' },
  { id: 'gps-collar', name: 'GPS Tracker', type: 'device', color: 'bg-yellow-500' },
  { id: 'soil-sensor', name: 'Soil Sensor', type: 'device', color: 'bg-gray-500' }
];

interface FarmMapProps {
  isCompact?: boolean;
  className?: string;
}

export const FarmMap: React.FC<FarmMapProps> = ({ isCompact = false, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'satellite' | 'street'>('satellite');

  // Google Maps Static API URL (using satellite view)
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${FARM_LAT},${FARM_LNG}&zoom=${isCompact ? 14 : 16}&size=${isCompact ? '400x200' : '800x600'}&maptype=${viewMode}&markers=color:red%7C${FARM_LAT},${FARM_LNG}&key=AIzaSyBocZLZokRJhbYCUxVeVl8YFr7HE0VLc_U`;

  const MapPreview = ({ compact = false }) => (
    <div className={`relative ${compact ? 'h-48' : 'h-96'} w-full rounded-lg overflow-hidden bg-muted/30`}>
      {/* Static map image */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Satellite className="w-12 h-12 mx-auto text-green-600" />
          <div className="space-y-2">
            <h3 className="font-semibold text-green-800">Farm Location</h3>
            <p className="text-sm text-green-700">KwaZulu-Natal, Msinga</p>
            <p className="text-xs text-green-600">
              {FARM_LAT.toFixed(4)}°S, {FARM_LNG.toFixed(4)}°E
            </p>
          </div>
        </div>
      </div>

      {/* Farm markers overlay */}
      <div className="absolute inset-0 p-4">
        <div className="relative w-full h-full">
          {farmMarkers.slice(0, compact ? 3 : 7).map((marker, index) => (
            <div
              key={marker.id}
              className={`absolute w-3 h-3 ${marker.color} rounded-full border-2 border-white shadow-md`}
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 10) % 40}%`,
              }}
              title={marker.name}
            />
          ))}
        </div>
      </div>

      {/* Controls overlay */}
      {!compact && (
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setViewMode(viewMode === 'satellite' ? 'street' : 'satellite')}
          >
            {viewMode === 'satellite' ? <Navigation className="w-4 h-4" /> : <Satellite className="w-4 h-4" />}
          </Button>
        </div>
      )}
    </div>
  );

  if (isCompact) {
    return (
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer group">
            <MapPreview compact />
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
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Farm Location - Interactive View</DialogTitle>
          </DialogHeader>
          <div className="h-full space-y-4">
            <MapPreview />
            
            {/* Farm details */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Farm Assets</h4>
                <div className="space-y-2">
                  {farmMarkers.map((marker) => (
                    <div key={marker.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 ${marker.color} rounded-full`} />
                      <span>{marker.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {marker.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Location Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coordinates:</span>
                    <span>{FARM_LAT.toFixed(4)}°S, {FARM_LNG.toFixed(4)}°E</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>KwaZulu-Natal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">District:</span>
                    <span>Msinga</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Area:</span>
                    <span>15.5 hectares</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <MapPreview />;
};