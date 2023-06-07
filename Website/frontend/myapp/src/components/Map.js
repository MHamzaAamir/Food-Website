import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "../CSS/map.css"
import { useMapContext } from '../hooks/useMapContext';



export default function Map() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaGFtemEtYW1pciIsImEiOiJjbGh1ZnU5dzYwdWlkM2xxZzlkcmV1YzZ0In0.Ic5hYjyBRRajI22nblKyZA';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  // const [lng, setLng] = useState(72.98);
  // const [lat, setLat] = useState(42.35);
  // const [location, setLocation] = useState("")

  const {lng,lat,location,setLng,setLat,setLocation,} = useMapContext()





  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 9,
    });

    marker.current = new mapboxgl.Marker({
      color: 'red'
    })

    marker.current.setLngLat(map.current.getCenter())
    .addTo(map.current);

    map.current.on('move', () => {

        setLng(marker.current.getLngLat().lng.toString())
        setLat(marker.current.getLngLat().lat.toString())
        marker.current.setLngLat(map.current.getCenter())
      
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false
    }));

  }, []);




  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <div className = "form-group mt-1">
        <input type="text" id="location" name="location" placeholder="Enter Detail Address" onChange={(e) => setLocation(e.target.value)} value={location} required />
      </div>

    </>
  );
}






