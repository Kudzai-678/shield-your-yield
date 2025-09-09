import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  // Separate refs for compact and full-screen maps to avoid conflicts
  const compactMapContainer = useRef<HTMLDivElement>(null);
  const fullScreenMapContainer = useRef<HTMLDivElement>(null);
  const compactMap = useRef<mapboxgl.Map | null>(null);
  const fullScreenMap = useRef<mapboxgl.Map | null>(null);
  
  const [compactMapLoaded, setCompactMapLoaded] = useState(false);
  const [fullScreenMapLoaded, setFullScreenMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [clickedLocation, setClickedLocation] = useState<[number, number] | null>(null);
  const [mapStyle, setMapStyle] = useState<'satellite' | 'streets' | 'terrain'>('satellite');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const mapStyles = {
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    streets: 'mapbox://styles/mapbox/streets-v12', 
    terrain: 'mapbox://styles/mapbox/outdoors-v12'
  };

  const getMapboxToken = async (): Promise<string | null> => {
    try {
      console.log('🗺️ Fetching Mapbox token...');
      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      
      if (error) {
        console.error('❌ Error fetching Mapbox token:', error);
        setMapError('Failed to load map configuration');
        return null;
      }
      
      const token = data?.token;
      if (!token) {
        console.error('❌ No token received from function');
        setMapError('No map token received');
        return null;
      }

      // Validate token format
      if (!token.startsWith('pk.')) {
        console.error('❌ Invalid token format:', token.substring(0, 10) + '...');
        setMapError('Invalid map token format');
        return null;
      }

      console.log('✅ Mapbox token retrieved successfully:', token.substring(0, 15) + '...');
      return token;
    } catch (error) {
      console.error('❌ Error calling token function:', error);
      setMapError('Unable to connect to map service');
      return null;
    }
  };

  const addFarmMarkers = useCallback((mapInstance: mapboxgl.Map) => {
    if (!mapInstance) {
      console.log('❌ No map instance provided for markers');
      return;
    }

    console.log('📍 Adding farm markers...');
    farmAssets.forEach((asset) => {
      try {
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
          .addTo(mapInstance);
        console.log(`✅ Added marker: ${asset.name}`);
      } catch (error) {
        console.error(`❌ Error adding marker ${asset.name}:`, error);
      }
    });
  }, []);

  const initializeMap = useCallback(async (
    container: HTMLDivElement,
    mapRef: React.MutableRefObject<mapboxgl.Map | null>,
    isCompactMode: boolean,
    setMapLoaded: (loaded: boolean) => void
  ) => {
    if (!container || mapRef.current) {
      console.log('⚠️ Map container not available or map already initialized');
      return;
    }

    console.log(`🗺️ Initializing ${isCompactMode ? 'compact' : 'full-screen'} map...`);
    setIsInitializing(true);
    
    try {
      const token = await getMapboxToken();
      if (!token) {
        console.log('❌ Cannot initialize map: no token');
        setIsInitializing(false);
        return;
      }

      setMapError(null);
      mapboxgl.accessToken = token;

      console.log('🎯 Creating map instance...');
      const newMap = new mapboxgl.Map({
        container: container,
        style: mapStyles[mapStyle],
        center: [FARM_LNG, FARM_LAT],
        zoom: isCompactMode ? 14 : 16,
        attributionControl: false
      });

      mapRef.current = newMap;

      newMap.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

      newMap.on('load', () => {
        console.log(`✅ ${isCompactMode ? 'Compact' : 'Full-screen'} map loaded successfully`);
        setMapLoaded(true);
        setIsInitializing(false);
        addFarmMarkers(newMap);
      });

      newMap.on('error', (e) => {
        console.error('❌ Mapbox error:', e);
        setMapError('Failed to load map. Please check your internet connection.');
        setMapLoaded(false);
        setIsInitializing(false);
      });

      if (!isCompactMode) {
        newMap.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          setClickedLocation([lng, lat]);
          
          // Add clicked location marker
          new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<div class="p-2">
                  <h3 class="font-semibold">Clicked Location</h3>
                  <p class="text-sm">${lat.toFixed(6)}°, ${lng.toFixed(6)}°</p>
                </div>`
              )
            )
            .addTo(newMap);

          toast(`Location pinned: ${lat.toFixed(6)}°, ${lng.toFixed(6)}°`);
        });
      }

    } catch (error) {
      console.error('❌ Error initializing map:', error);
      setMapError('Failed to load map. Please check your internet connection.');
      setIsInitializing(false);
    }
  }, [mapStyle, getMapboxToken, addFarmMarkers]);

  // Initialize compact map
  useEffect(() => {
    if (isCompact && compactMapContainer.current && !compactMap.current && !isInitializing) {
      console.log('🔄 Initializing compact map...');
      initializeMap(compactMapContainer.current, compactMap, true, setCompactMapLoaded);
    }

    return () => {
      if (compactMap.current) {
        console.log('🧹 Cleaning up compact map...');
        compactMap.current.remove();
        compactMap.current = null;
        setCompactMapLoaded(false);
      }
    };
  }, [isCompact, initializeMap]);

  // Initialize full-screen map when dialog opens
  useEffect(() => {
    if (isFullScreen && fullScreenMapContainer.current && !fullScreenMap.current && !isInitializing) {
      console.log('🔄 Initializing full-screen map...');
      // Small delay to ensure dialog is fully rendered
      const timer = setTimeout(() => {
        if (fullScreenMapContainer.current) {
          initializeMap(fullScreenMapContainer.current, fullScreenMap, false, setFullScreenMapLoaded);
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    return () => {
      if (!isFullScreen && fullScreenMap.current) {
        console.log('🧹 Cleaning up full-screen map...');
        fullScreenMap.current.remove();
        fullScreenMap.current = null;
        setFullScreenMapLoaded(false);
      }
    };
  }, [isFullScreen, initializeMap]);

  const locateUser = useCallback(() => {
    const currentMap = isFullScreen ? fullScreenMap.current : compactMap.current;
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
        
        if (currentMap) {
          currentMap.flyTo({
            center: [longitude, latitude],
            zoom: 16,
            duration: 2000
          });

          // Add user location marker
          new mapboxgl.Marker({ color: '#22c55e' })
            .setLngLat([longitude, latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<div class="p-2">
                  <h3 class="font-semibold">Your Location</h3>
                  <p class="text-sm">${latitude.toFixed(6)}°, ${longitude.toFixed(6)}°</p>
                </div>`
              )
            )
            .addTo(currentMap);
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
  }, [isFullScreen]);

  const toggleMapStyle = useCallback(() => {
    const styles: (keyof typeof mapStyles)[] = ['satellite', 'streets', 'terrain'];
    const currentIndex = styles.indexOf(mapStyle);
    const nextStyle = styles[(currentIndex + 1) % styles.length];
    setMapStyle(nextStyle);
    
    const currentMap = isFullScreen ? fullScreenMap.current : compactMap.current;
    if (currentMap) {
      currentMap.setStyle(mapStyles[nextStyle]);
      currentMap.once('styledata', () => {
        addFarmMarkers(currentMap);
      });
    }
  }, [mapStyle, isFullScreen, addFarmMarkers]);

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
      <div className="relative cursor-pointer group h-48 w-full rounded-lg overflow-hidden bg-muted/10">
        <div 
          ref={compactMapContainer} 
          className="w-full h-full"
          style={{ minHeight: '192px' }}
        />
        {(!compactMapLoaded || isInitializing) && !mapError && (
          <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
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
      <div className="relative w-full h-[70vh] rounded-lg overflow-hidden bg-muted/10">
        <div 
          ref={fullScreenMapContainer} 
          className="w-full h-full"
          style={{ minHeight: '70vh' }}
        />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleMapStyle}
            title={`Switch to ${mapStyle === 'satellite' ? 'streets' : mapStyle === 'streets' ? 'terrain' : 'satellite'}`}
            disabled={!fullScreenMapLoaded}
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
            disabled={!fullScreenMapLoaded}
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

        {(!fullScreenMapLoaded || isInitializing) && !mapError && (
          <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-sm text-muted-foreground">Loading full map...</p>
            </div>
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