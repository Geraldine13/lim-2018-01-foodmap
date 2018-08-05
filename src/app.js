window.onload = () => {  
  const preload = setTimeout( () => {
    document.getElementById("loader").classList.add('hidden');
    document.getElementById("container").classList.remove('hidden');
    }, 2000);
}

function initMap () {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(ubiety){
      let map, infoWindow, service;

      const latitude = ubiety.coords.latitude;
      const longitude = ubiety.coords.longitude;

      const myPosition = new google.maps.LatLng(latitude, longitude);

      map = new google.maps.Map(document.getElementById ('map'), {
        center: myPosition,
        zoom: 18
      });

      const myMarker = new google.maps.Marker({
      position: myPosition,
      map: map
      }) 

      const inputSearch = document.getElementById('search');
      new google.maps.places.Autocomplete(inputSearch);
    
      var request = {
        location: myPosition,
        radius: '500',
        type: ['restaurant']
      };
    
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    
      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
           
        var image = {
            url: 'marcador.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
      
          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });
        
      }
    }, function(error){
      alert(error);
    });
  } else {
    alert(error);
  }



}




