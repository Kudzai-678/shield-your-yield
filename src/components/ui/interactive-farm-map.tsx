import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Maximize2, 
  MapPin, 
  Satellite, 
  Navigation, 
  Crosshair,
  Map as MapIcon,
  Mountain,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

// Farm coordinates (KwaZulu-Natal, Msinga)
const FARM_LAT = -28.7282;
const FARM_LNG = 30.4319;

// Sample farm markers
const farmAssets = [
  { id: 'farm-center', name: 'Mthunzini Farm', type: 'farm', position: [FARM_LNG, FARM_LAT] as [number, number], color: '#ef4444' },
  { id: 'maize-field', name: 'Maize Field A', type: 'crop', position: [FARM_LNG + 0.002, FARM_LAT - 0.001] as [number, number], color: '#22c55e' },
  { id: 'sweet-potato', name: 'Sweet Potato Field', type: 'crop', position: [FARM_LNG - 0.001, FARM_LAT + 0.002] as [number, number], color: '#f97316' },
  { id: 'cattle-area', name: 'Cattle Grazing', type: 'livestock', position: [FARM_LNG + 0.003, FARM_LAT + 0.001] as [number, number], color: '#3b82f6' },
  { id: 'goat-pen', name: 'Goat Enclosure', type: 'livestock', position: [FARM_LNG - 0.002, FARM_LAT - 0.002] as [number, number], color: '#a855f7' },
  { id: 'gps-collar', name: 'GPS Tracker', type: 'device', position: [FARM_LNG + 0.001, FARM_LAT + 0.003] as [number, number], color: '#eab308' },
  { id: 'soil-sensor', name: 'Soil Sensor', type: 'device', position: [FARM_LNG - 0.003, FARM_LAT - 0.001] as [number, number], color: '#6b7280' }
];

interface InteractiveFarmMapProps {
  isCompact?: boolean;
  className?: string;
}

export const InteractiveFarmMap: React.FC<InteractiveFarmMapProps> = ({ 
  isCompact = false, 
  className = '' 
}) => {
  const compactMapContainer = useRef<HTMLDivElement>(null);
  const fullScreenMapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapStyle, setMapStyle] = useState<'satellite' | 'streets' | 'terrain'>('satellite');
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const mapStyles = {
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    streets: 'mapbox://styles/mapbox/streets-v12', 
    terrain: 'mapbox://styles/mapbox/outdoors-v12'
  };

  const getMapboxToken = async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      
      if (error) {
        console.error('Error fetching Mapbox token:', error);
        setMapError('Failed to load map configuration');
        return null;
      }
      
      return data?.token || null;
    } catch (error) {
      console.error('Error calling token function:', error);
      setMapError('Unable to connect to map service');
      return null;
    }
  };

  const addFarmMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    farmAssets.forEach((asset) => {
      const marker = new mapboxgl.Marker({ color: asset.color })
        .setLngLat(asset.position)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div class="p-2">
              <h3 class="font-semibold">${asset.name}</h3>
              <p class="text-sm capitalize">${asset.type}</p>
            </div>`
          )
        )
        .addTo(map.current);
      
      markersRef.current.push(marker);
    });
  };

  // Initialize map once
  useEffect(() => {
    if (!compactMapContainer.current || map.current) return;

    const initializeMap = async () => {
      const token = await getMapboxToken();
      if (!token) return;

      try {
        console.log('Initializing map...');
        setMapError(null);
        mapboxgl.accessToken = token;

        map.current = new mapboxgl.Map({
          container: compactMapContainer.current!,
          style: mapStyles[mapStyle],
          center: [FARM_LNG, FARM_LAT],
          zoom: 14,
          attributionControl: false
        });

        map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

        map.current.on('load', () => {
          console.log('Map loaded successfully');
          setMapLoaded(true);
          addFarmMarkers();
        });

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setMapError('Failed to load map. Please check your internet connection.');
          setMapLoaded(false);
        });

        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          
          // Add clicked location marker
          const clickMarker = new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<div class="p-2">
                  <h3 class="font-semibold">Clicked Location</h3>
                  <p class="text-sm">${lat.toFixed(6)}°, ${lng.toFixed(6)}°</p>
                </div>`
              )
            )
            .addTo(map.current!);

          markersRef.current.push(clickMarker);
          toast(`Location pinned: ${lat.toFixed(6)}°, ${lng.toFixed(6)}°`);
        });

      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to load map. Please check your internet connection.');
      }
    };

    initializeMap();
  }, []);

  // Move map to fullscreen container when dialog opens
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (isFullScreen && fullScreenMapContainer.current) {
      // Move map to fullscreen container
      const currentContainer = map.current.getContainer();
      const newContainer = fullScreenMapContainer.current;
      
      // Only move if it's not already in the right container
      if (currentContainer !== newContainer) {
        console.log('Moving map to fullscreen container');
        map.current.remove();
        
        map.current = new mapboxgl.Map({
          container: newContainer,
          style: mapStyles[mapStyle],
          center: map.current.getCenter(),
          zoom: 16, // Zoom in for fullscreen
          attributionControl: false
        });

        map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

        map.current.on('load', () => {
          addFarmMarkers();
        });

        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          
          const clickMarker = new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<div class="p-2">
                  <h3 class="font-semibold">Clicked Location</h3>
                  <p class="text-sm">${lat.toFixed(6)}°, ${lng.toFixed(6)}°</p>
                </div>`
              )
            )
            .addTo(map.current!);

          markersRef.current.push(clickMarker);
          toast(`Location pinned: ${lat.toFixed(6)}°, ${lng.toFixed(6)}°`);
        });
      }
    } else if (!isFullScreen && compactMapContainer.current) {
      // Move map back to compact container
      const currentContainer = map.current.getContainer();
      const newContainer = compactMapContainer.current;
      
      if (currentContainer !== newContainer) {
        console.log('Moving map to compact container');
        const center = map.current.getCenter();
        map.current.remove();
        
        map.current = new mapboxgl.Map({
          container: newContainer,
          style: mapStyles[mapStyle],
          center: center,
          zoom: 14, // Zoom out for compact
          attributionControl: false
        });

        map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

        map.current.on('load', () => {
          addFarmMarkers();
        });
      }
    }
  }, [isFullScreen, mapLoaded]);

  const locateUser = () => {
    if (!navigator.geolocation || !map.current) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 16,
            duration: 2000
          });

          // Add user location marker
          const userMarker = new mapboxgl.Marker({ color: '#22c55e' })
            .setLngLat([longitude, latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<div class="p-2">
                  <h3 class="font-semibold">Your Location</h3>
                  <p class="text-sm">${latitude.toFixed(6)}°, ${longitude.toFixed(6)}°</p>
                </div>`
              )
            )
            .addTo(map.current);

          markersRef.current.push(userMarker);
        }

        toast.success('Location found and pinned!');
      },
      (error) => {
        toast.error('Unable to retrieve your location');
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  const toggleMapStyle = () => {
    const styles: (keyof typeof mapStyles)[] = ['satellite', 'streets', 'terrain'];
    const currentIndex = styles.indexOf(mapStyle);
    const nextStyle = styles[(currentIndex + 1) % styles.length];
    setMapStyle(nextStyle);
    
    if (map.current) {
      map.current.setStyle(mapStyles[nextStyle]);
      map.current.once('styledata', () => {
        addFarmMarkers();
      });
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (map.current) {
        markersRef.current.forEach(marker => marker.remove());
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const CompactMap = () => {
    if (mapError) {
      return (
        <div className="h-48 w-full rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/20">
          <div className="text-center space-y-2">
            <AlertTriangle className="w-8 h-8 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">{mapError}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative cursor-pointer group h-48 w-full rounded-lg overflow-hidden">
        <div ref={compactMapContainer} className="w-full h-full" />
        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            View Full Map
          </Button>
        </div>
      </div>
    );
  };

  const FullScreenMap = () => {
    if (mapError) {
      return (
        <div className="w-full h-[70vh] rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/20">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Map Error</h3>
              <p className="text-sm text-muted-foreground">
                {mapError}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
        <div ref={fullScreenMapContainer} className="w-full h-full" />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleMapStyle}
            title={`Switch to ${mapStyle === 'satellite' ? 'streets' : mapStyle === 'streets' ? 'terrain' : 'satellite'}`}
            disabled={!mapLoaded}
          >
            {mapStyle === 'satellite' ? <MapIcon className="w-4 h-4" /> : 
             mapStyle === 'streets' ? <Mountain className="w-4 h-4" /> : 
             <Satellite className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={locateUser}
            title="Find my location"
            disabled={!mapLoaded}
          >
            <Crosshair className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-2 max-w-xs">
          <h4 className="font-semibold text-sm">Farm Assets</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {farmAssets.slice(0, 4).map((asset) => (
              <div key={asset.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border border-white" 
                  style={{ backgroundColor: asset.color }}
                />
                <span className="truncate">{asset.name}</span>
              </div>
            ))}
          </div>
        </div>

        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    );
  };

  if (isCompact) {
    return (
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogTrigger asChild>
          <div onClick={() => setIsFullScreen(true)}>
            <CompactMap />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full h-[80vh]">
          <DialogTitle className="sr-only">Interactive Farm Map</DialogTitle>
          <DialogDescription className="sr-only">
            View and interact with the farm location map. Click to place pins and use location services.
          </DialogDescription>
          <FullScreenMap />
        </DialogContent>
      </Dialog>
    );
  }

  return <FullScreenMap />;
};