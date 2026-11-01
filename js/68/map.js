/* global google*/

const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
  google.maps.importLibrary('maps'),
  google.maps.importLibrary('marker'),
]);

const map = new /*google.maps.*/Map(document.getElementById('map'), {
  center: { lat: 40.09543950426593, lng: -74.2221793333354 },
  zoom: 18,
  renderingType: 'VECTOR',
  mapTypeId: 'satellite',
  mapId: 'DEMO_MAP_ID'
});
let number = 1;
let activeMarkers = [];

const input = document.querySelector('input');
input.addEventListener('change', async () => {
  try {
    number = 1;

    activeMarkers.forEach(marker => marker.setMap(null));
    activeMarkers = [];

    const info = await fetch(`http://api.geonames.org/wikipediaSearch?q=${input.value}&maxRows=10&username=saragreenwald&type=json`);
    const data = await info.json();
    console.log(data);
    const bounds = new google.maps.LatLngBounds();
    data.geonames.forEach(item => {
      const placeMarker = new AdvancedMarkerElement({
        map,
        position: { lat: item.lat, lng: item.lng },
        title: item.title
      });
      
      activeMarkers.push(placeMarker);

      const div = document.querySelector(`#info div:nth-child(${number})`);
      div.querySelector('h1').textContent = item.title;
      if (item.thumbnailImg) {
        div.querySelector('div img').src = `https://${item.thumbnailImg}`;
        const img = document.createElement('img');
        img.className = 'map-icon';
        img.src = new URL(`https://${item.thumbnailImg}`);
        placeMarker.append(img);
      }
      div.querySelector('p').textContent = item.summary;
      document.querySelector('#info').style.display = 'block';
      div.addEventListener('click', () => {
        map.panTo({ lat: item.lat, lng: item.lng });
        map.setZoom(18);
      });

      const infoWindow = new InfoWindow();
      placeMarker.addListener('click', () => {
        infoWindow.setContent(`${item.summary}, <a href="https://${item.wikipediaUrl}" target="_blank">Read More</a>`);
        infoWindow.open({
          anchor: placeMarker
        });
      });
      bounds.extend({ lat: item.lat, lng: item.lng });
      number++;
    });   
    map.fitBounds(bounds);
  } catch (e) { 
    console.error(e);
  }
});


