export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5kcmlhbnN5YWgiLCJhIjoiY2s2amMyM3doMDd1aTNrcDF3aG5mdHd4cCJ9.3_fMY2wbP57QIoK9p85sqg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/andriansyah/ck6jcjdnv16x61iny6wxspf75',
    scrollZoom: false
    //   center: [-118.113491, 34.11745],
    //   zoom: 10,
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //Buat sebuah tanda atau marker (point)
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
