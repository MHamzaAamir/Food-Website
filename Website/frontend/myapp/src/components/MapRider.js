import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "../CSS/map.css"



export default function Map({lng,lat}) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaGFtemEtYW1pciIsImEiOiJjbGh1ZnU5dzYwdWlkM2xxZzlkcmV1YzZ0In0.Ic5hYjyBRRajI22nblKyZA';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);






  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 12,
    });

    marker.current = new mapboxgl.Marker({
      color: 'red'
    })

    marker.current.setLngLat(map.current.getCenter())
    .addTo(map.current);



    map.current.addControl(new mapboxgl.NavigationControl(), "top-right")



  }, []);




  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>


    </>
  );
}






