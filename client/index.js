import mapboxgl from "mapbox-gl";
import buildMarker from "./marker.js";
import fetchPlaces from './ajax';

const hotelSelect = document.getElementById('hotels-choices');
const restaurantSelect = document.getElementById('restaurants-choices');
const activitiesSelect = document.getElementById('activities-choices');

mapboxgl.accessToken = "pk.eyJ1IjoibXdhbjA5MDYiLCJhIjoiY2p0NGh5YWZ1MDFucjQ1bzB0bWNycjZsNCJ9.iueTVoAQPOsXrkidEaGkUA";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

const hotelCoords = {};
const restCoords = {};
const actCoords = {};
fetchPlaces().then( data => {
  data.hotels.forEach( hotel => {
    hotelCoords[hotel.name] = { location : hotel.place.location };
    let hot = document.createElement('option');
    hot.innerHTML = hotel.name
    hotelSelect.appendChild(hot);
  })

  data.restaurants.forEach( restaurant => {
    restCoords[restaurant.name] = { location: restaurant.place.location };
    let res = document.createElement('option');
    res.innerHTML = restaurant.name
    restaurantSelect.appendChild(res);
  })

  data.activities.forEach( activity => {
    actCoords[activity.name] = { location: activity.place.location };
    let act = document.createElement('option');
    act.innerHTML = activity.name
    activitiesSelect.appendChild(act);
  })
} );

document.getElementById('hotels-add').addEventListener('click', () => {
  let addedHotel = hotelSelect.value;
  let newItem = document.createElement('li');
  newItem.innerHTML = addedHotel;
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.className = 'delete';
  newItem.appendChild(deleteButton)
  document.getElementById('hotels-list').append(newItem);

  let newMarker = buildMarker('hotels', hotelCoords[addedHotel].location);
  hotelCoords[addedHotel].marker = newMarker;
  newMarker.addTo(map);
})

document.getElementById('restaurants-add').addEventListener('click', () => {
  let addedRes = restaurantSelect.value;
  let newItem = document.createElement('li');
  newItem.innerHTML = addedRes;
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.className = 'delete';
  newItem.appendChild(deleteButton)
  document.getElementById('restaurants-list').append(newItem);

  let newMarker = buildMarker('restaurants', restCoords[addedRes].location);
  restCoords[addedRes].marker = newMarker;
  newMarker.addTo(map);
})

document.getElementById('activities-add').addEventListener('click', () => {
  let addedAct = activitiesSelect.value;
  let newItem = document.createElement('li');
  newItem.innerHTML = addedAct;
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.className = 'delete';
  newItem.appendChild(deleteButton)
  document.getElementById('activities-list').append(newItem);

  let newMarker = buildMarker('activities', actCoords[addedAct].location);
  actCoords[addedAct].marker = newMarker;
  map.flyTo({ center: actCoords[addedAct].location, zoom : 15});
  newMarker.addTo(map);
})

document.getElementById('itinerary').addEventListener('click', (event) => {
  const {target} = event;
  if (target.matches('.delete')) {
    let locationName = target.parentElement.innerText.substr(0, target.parentElement.innerText.length - 1);
    if ( hotelCoords[locationName] ) {
      hotelCoords[locationName].marker.remove();
    }
    else if ( restCoords[locationName] ) {
      restCoords[locationName].marker.remove();
    }
    else {
      actCoords[locationName].marker.remove();
    }
    target.parentElement.remove();
  }
})