import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Maximize2, 
  Satellite, 
  Crosshair,
  Map as MapIcon,
  Mountain,
  AlertTriangle,
  Plus,
  Minus
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Farm coordinates (KwaZulu-Natal, Msinga)
const FARM_LAT = -28.7282;
const FARM_LNG = 30.4319;

// Sample farm markers
const farmAssets = [
  { id: 'farm-center', name: 'Mthunzini Farm', type: 'farm', position: [FARM_LNG, FARM_LAT] as [number, number], color: '#ef4444' },
  { id: 'maize-field', name: 'Maize Field A', type: 'crop', position: [FARM_LNG + 0.002, FARM_LAT - 0.001] as [number, number], color: '#22c55e' },
  { id: 'sweet-potato', name: 'Sweet Potato Field', type: 'crop', position: [FARM_LNG - 0.001, FARM_LAT + 0.002] as [number, number], color: '#f97316' },
  { id: 'cattle-area', name: 'Cattle Grazing', type: 'livestock', position: [FARM_LNG + 0.003, FARM_LAT + 0.001] as [number, number], color: '#3b82f6' }
];

interface InteractiveFarmMapProps {
  isCompact?: boolean;
  className?: string;
}

// Compact Map Component
const CompactMapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initMap = async () => {
      try {
        const { data } = await supabase.functions.invoke('get-mapbox-token');
        if (!data?.token) throw new Error('No token');

        mapboxgl.accessToken = data.token;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/satellite-v9',
          center: [FARM_LNG, FARM_LAT],
          zoom: 14,
          attributionControl: false
        });

        map.current.on('load', () => {
          setIsLoaded(true);
          farmAssets.forEach((asset) => {
            new mapboxgl.Marker({ color: asset.color })
              .setLngLat(asset.position)
              .addTo(map.current!);
          });
        });

        map.current.on('error', () => setError('Map failed to load'));
      } catch (err) {
        setError('Failed to initialize map');
      }
    };

    initMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="h-48 w-full rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-2">
          <AlertTriangle className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative cursor-pointer group h-48 w-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
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

// Full Screen Map Component
const FullScreenMapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<'satellite' | 'streets' | 'terrain'>('satellite');

  const mapStyles = {
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    streets: 'mapbox://styles/mapbox/streets-v12', 
    terrain: 'mapbox://styles/mapbox/outdoors-v12'
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const timer = setTimeout(async () => {
      try {
        const { data } = await supabase.functions.invoke('get-mapbox-token');
        if (!data?.token) throw new Error('No token');

        mapboxgl.accessToken = data.token;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: mapStyles[mapStyle],
          center: [FARM_LNG, FARM_LAT],
          zoom: 16,
          attributionControl: false
        });

        map.current.on('load', () => {
          setIsLoaded(true);
          farmAssets.forEach((asset) => {
            new mapboxgl.Marker({ color: asset.color })
              .setLngLat(asset.position)
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  `<div class="p-2">
                    <h3 class="font-semibold">${asset.name}</h3>
                    <p class="text-sm capitalize">${asset.type}</p>
                  </div>`
                )
              )
              .addTo(map.current!);
          });
        });

        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([lng, lat])
            .addTo(map.current!);
          toast(`Location pinned: ${lat.toFixed(6)}°, ${lng.toFixed(6)}°`);
        });

        map.current.on('error', () => setError('Map failed to load'));
      } catch (err) {
        setError('Failed to initialize map');
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const toggleMapStyle = () => {
    const styles: (keyof typeof mapStyles)[] = ['satellite', 'streets', 'terrain'];
    const currentIndex = styles.indexOf(mapStyle);
    const nextStyle = styles[(currentIndex + 1) % styles.length];
    setMapStyle(nextStyle);
    
    if (map.current) {
      map.current.setStyle(mapStyles[nextStyle]);
    }
  };

  const locateUser = () => {
    if (!navigator.geolocation || !map.current) {
      toast.error('Geolocation not available');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        if (map.current) {
          map.current.flyTo({ center: [longitude, latitude], zoom: 16 });
          new mapboxgl.Marker({ color: '#22c55e' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
        toast.success('Location found!');
      },
      () => toast.error('Unable to get location')
    );
  };

  const zoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  if (error) {
    return (
      <div className="w-full h-[70vh] rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      <div className="absolute top-4 right-4 space-y-2 z-10">
        <Button variant="secondary" size="sm" onClick={zoomIn} disabled={!isLoaded}>
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={zoomOut} disabled={!isLoaded}>
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={toggleMapStyle} disabled={!isLoaded}>
          {mapStyle === 'satellite' ? <MapIcon className="w-4 h-4" /> : 
           mapStyle === 'streets' ? <Mountain className="w-4 h-4" /> : 
           <Satellite className="w-4 h-4" />}
        </Button>
        <Button variant="secondary" size="sm" onClick={locateUser} disabled={!isLoaded}>
          <Crosshair className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-2 max-w-xs z-10">
        <h4 className="font-semibold text-sm">Farm Assets</h4>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {farmAssets.map((asset) => (
            <div key={asset.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
              <span className="truncate">{asset.name}</span>
            </div>
          ))}
        </div>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-20">
          <div className="text-center space-y-2">
            <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const InteractiveFarmMap: React.FC<InteractiveFarmMapProps> = ({ isCompact = false }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (isCompact) {
    return (
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogTrigger asChild>
          <div onClick={() => setIsFullScreen(true)}>
            <CompactMapComponent />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-6">
          <DialogTitle className="sr-only">Interactive Farm Map</DialogTitle>
          <DialogDescription className="sr-only">
            View and interact with the farm location map. Click to place pins and use location services.
          </DialogDescription>
          <FullScreenMapComponent key={isFullScreen ? 'fullscreen' : 'closed'} />
        </DialogContent>
      </Dialog>
    );
  }

  return <FullScreenMapComponent />;
};