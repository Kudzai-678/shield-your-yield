import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FARM_LAT = -28.7041;
const FARM_LNG = 24.2464;

const farmMarkers = [
  { id: 1, name: "Main Crop Field", type: "Crops", color: "bg-green-500" },
  { id: 2, name: "Livestock Grazing Area", type: "Livestock", color: "bg-blue-500" },
  { id: 3, name: "Water Source", type: "Infrastructure", color: "bg-cyan-500" },
  { id: 4, name: "Storage Facility", type: "Infrastructure", color: "bg-orange-500" },
  { id: 5, name: "Equipment Shed", type: "Infrastructure", color: "bg-purple-500" },
  { id: 6, name: "Secondary Field", type: "Crops", color: "bg-green-400" },
];

const MapPreview = () => (
  <div className="relative w-full h-64 sm:h-80 bg-muted rounded-lg overflow-hidden">
    <img
      src="/placeholder.svg"
      alt="Farm satellite view"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-green-500/10" />
    
    {/* Farm markers */}
    {farmMarkers.map((marker) => (
      <div
        key={marker.id}
        className={`absolute w-3 h-3 ${marker.color} rounded-full border-2 border-white shadow-md`}
        style={{
          left: `${20 + (marker.id * 12)}%`,
          top: `${30 + (marker.id * 8)}%`,
        }}
      />
    ))}
    
    {/* Farm boundary outline */}
    <div className="absolute inset-4 border-2 border-dashed border-green-600/60 rounded-lg" />
  </div>
);

export const FarmLocation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/farm?tab=location')}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Farm Location</h1>
            <p className="text-sm text-muted-foreground">Interactive farm map and location details</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Map Section */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Farm Overview Map</h2>
          <MapPreview />
        </Card>

        {/* Farm Assets and Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-4 text-base">Farm Assets</h3>
            <div className="space-y-3">
              {farmMarkers.map((marker) => (
                <div key={marker.id} className="flex items-center gap-3 text-sm min-w-0">
                  <div className={`w-3 h-3 ${marker.color} rounded-full flex-shrink-0`} />
                  <span className="truncate flex-1 min-w-0">{marker.name}</span>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {marker.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-semibold mb-4 text-base">Location Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">Coordinates:</span>
                <span className="font-mono">{FARM_LAT.toFixed(4)}°S, {FARM_LNG.toFixed(4)}°E</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">Region:</span>
                <span>KwaZulu-Natal</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">District:</span>
                <span>Msinga</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">Total Area:</span>
                <span>15.5 hectares</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">Climate Zone:</span>
                <span>Subtropical Highland</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-muted-foreground font-medium">Soil Type:</span>
                <span>Clay Loam</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 text-base">Farm Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Property Details</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>Registered Farm: KZN-MSN-001</p>
                <p>Land Use: Mixed Agriculture</p>
                <p>Water Rights: Seasonal</p>
                <p>Elevation: 1,240m above sea level</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Infrastructure</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>Main Access Road: Gravel</p>
                <p>Power Supply: Grid Connected</p>
                <p>Water Source: Borehole + Stream</p>
                <p>Internet: 4G Coverage</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};