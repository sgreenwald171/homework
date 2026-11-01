/* global google */
const key = 'saragreenwald';
const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
  google.maps.importLibrary('maps'),
  google.maps.importLibrary('marker'),
]);

const map = new Map(document.querySelector('#map'), {
  center: { lat: 40.09543950426593, lng: -74.2221793333354 },
  zoom: 18,
  mapId: 'DEMO_MAP_ID'
});

const placesList = document.querySelector('#places');
const searchInput = document.querySelector('#search');

const infoWindow = new InfoWindow();

let currentlySelectedSummary;

let geonamesObjects = [];
if (localStorage.getItem('places') !== null) {
  const savedPlaces = JSON.parse(localStorage.getItem('places'));
  geonamesObjects = savedPlaces;
  load(savedPlaces);
}

document.querySelector('#searchForm').addEventListener('submit', async e => {
  e.preventDefault();

  try {
    const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchInput.value}&maxRows=10&username=${key}&type=json`);

    if (!response.ok) {
      throw new Error(`${response.status}  ${response.statusText}`);
    }

    const { geonames } = await response.json();
    console.log(geonames);

    load(geonames);

    geonames.forEach(place => {
      const geonamesObject = {
        lat: place.lat,
        lng: place.lng,
        title: `${place.title}`,
        summary: `${place.summary}`,
        wikipediaUrl: `${place.wikipediaUrl}`
      };
      geonamesObjects.push(geonamesObject);
    });
    localStorage.setItem('places', JSON.stringify(geonamesObjects));

  } catch (e) {
    console.error(e);
  }
});


function doAfter(action, delay) {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      action();
      resolve();
    }, delay);
  });
}

function load(geonames){
  const bounds = new google.maps.LatLngBounds();

  geonames.forEach(place => {
    const loc = { lat: Number(place.lat), lng: Number(place.lng) };

    const img = document.createElement('img');
    img.src = './chulent.jpg'; 
    img.alt = place.title;
    img.className = 'marker-image';

    const marker = new AdvancedMarkerElement({
      map,
      position: loc,
      title: place.title
    });

    marker.addListener('click', () => {
      infoWindow.setContent(`<div><h5>${place.title}</h5>${place.summary}<a target="_blank" href="https://${place.wikipediaUrl}">more info</a></div>`);
      infoWindow.open({
        anchor: marker
      });
    });

    marker.append(img);

    bounds.extend(loc);

    const placeLi = document.createElement('li');
    placeLi.innerHTML = `
        <div>
          <div class="info">
            <span>${place.title}</span>
            <img src=${'./chulent.jpg'} alt=${place.title} />
          </div>
          <div class="summary">${place.summary}</div>
        </div>`;
    placesList.append(placeLi);

    const summary = placeLi.querySelector('.summary');

    placeLi.addEventListener('click', async () => {
      map.setZoom(6);

      if (currentlySelectedSummary) {
        currentlySelectedSummary.classList.remove('active');
      }
      currentlySelectedSummary = summary;
      currentlySelectedSummary.classList.add('active');
      await doAfter(() => map.panTo(loc), 1500);
      await doAfter(() => map.setZoom(18), 1500);
    });
  });

  map.fitBounds(bounds);

}

document.querySelector('#clear').addEventListener('click', () => {
  localStorage.removeItem('places');
  geonamesObjects = [];
  placesList.innerHTML = '';
  location.reload();
});
