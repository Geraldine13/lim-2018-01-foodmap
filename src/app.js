const showContainer = () => {
  document.getElementById("loader").classList.add('hidden');
  document.getElementById("container").classList.remove('hidden');
}

const splash = () => {
  const preload = setTimeout(showContainer, 2000);
}

function initMap() {
  const  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -11.853, lng: -77.0383 },
    zoom: 8
  });
}