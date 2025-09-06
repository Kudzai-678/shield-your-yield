import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color = 'blue') => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export interface SimpleMapMarker {
  id: string | number;
  position: [number, number];
  color?: string;
  popup?: {
    title: string;
    content: string;
  };
}

export interface SimpleMapPolygon {
  id: string | number;
  positions: [number, number][];
  style?: L.PathOptions;
  popup?: string;
}

export interface SimpleMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: SimpleMapMarker[];
  polygons?: SimpleMapPolygon[];
  onMarkerClick?: (marker: SimpleMapMarker) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SimpleMap: React.FC<SimpleMapProps> = ({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [],
  polygons = [],
  onMarkerClick,
  className = '',
  style = { height: '320px', width: '100%' }
}) => {
  return (
    <div className={`simple-map ${className}`} style={style}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers */}
        {markers.map((marker, index) => (
          <Marker
            key={marker.id || index}
            position={marker.position}
            icon={createCustomIcon(marker.color)}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(marker)
            }}
          >
            {marker.popup && (
              <Popup>
                <div>
                  <h3 className="font-semibold">{marker.popup.title}</h3>
                  <p>{marker.popup.content}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}

        {/* Polygons */}
        {polygons.map((polygon, index) => (
          <Polygon
            key={polygon.id || index}
            positions={polygon.positions}
            pathOptions={polygon.style || { color: 'green', weight: 2, fillOpacity: 0.1 }}
          >
            {polygon.popup && <Popup>{polygon.popup}</Popup>}
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};