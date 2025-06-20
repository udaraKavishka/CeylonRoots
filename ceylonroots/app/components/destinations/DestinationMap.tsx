import React from 'react';
import Image from 'next/image';
import { DestinationDetails } from '../../types/travel';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface DestinationMapProps {
    destinations: DestinationDetails[];
}

const DestinationMap: React.FC<DestinationMapProps> = ({ destinations }) => {
    // Calculate center of Sri Lanka if no destinations
    const center: [number, number] = [7.8731, 80.7718]; // Center of Sri Lanka

    return (
        <MapContainer
            center={center}
            zoom={8}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {destinations.map(destination => (
                destination.coordinates && (
                    <Marker
                        key={destination.id}
                        position={[destination.coordinates.latitude, destination.coordinates.longitude]}
                    >
                        <Popup>
                            <div className="max-w-xs">
                                <h3 className="font-bold text-lg">{destination.name}</h3>
                                {destination.image && (
                                    <div className="w-full h-32 relative mt-2 rounded overflow-hidden">
                                        <Image
                                            src={destination.image}
                                            alt={destination.name}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded"
                                            priority={true}
                                        />
                                    </div>
                                )}
                )}
                                <p className="mt-2 text-sm">{destination.description.substring(0, 100)}...</p>
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
};

export default DestinationMap;