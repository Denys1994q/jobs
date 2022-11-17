import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = ({ lat, long }) => {
    return (
        <Map
            initialViewState={{
                latitude: lat,
                longitude: long,
                zoom: 1,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle='mapbox://styles/mapbox/dark-v10'
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}>
            <Marker longitude={long} latitude={lat} anchor='bottom-left'>
                <img src='/Location.png' alt='location-icon' />
            </Marker>
        </Map>
    );
};

export default MapComponent;
