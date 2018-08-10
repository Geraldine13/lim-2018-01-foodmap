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

  getFood();
}






// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.modal');
//   var instances = M.Modal.init(elems);
// });

const filterFood = (stringSearch, dataFood) => {
  const foodFilter = dataFood.filter(food => {
    return food.name.toLowerCase().indexOf(stringSearch.toLowerCase()) > -1;
  })
  return foodFilter;
}

const addFood = () => {
  const data = JSON.parse(event.currentTarget.responseText);
  //console.log(data);
  
  const searchFood = document.getElementById('search');

  searchFood.addEventListener('keyup', () => {
    const search = searchFood.value;
    const showFood = filterFood(search, data);
    return showFood;
    console.log(showFood);

    // console.log(search);
    // console.log(dataFood);  
})


  const showFood = document.getElementById('container-food');
  showFood.innerHTML = '';
  Object.keys(data).forEach((id) => {
    const food = data[id];
    //console.log(food);
    showFood.innerHTML += `
    <div class="row" id=${id}>
      <div class="col s12 m6">
        <div class="card white">
          <div class="card-content black-text">
            <h4>${food.name}</h4>
            <p>Dirección: ${food.address}</p>
            <p>Tel. reserva: ${food.phone}</p>
            <p>Tipo de comida: ${food.typeFood}</p>
          </div>
        </div>
      </div>
    </div>
    
    `
  })
  // <!-- Modal Structure -->
  // <div id="modal1" class="modal">
  //     <div class="modal-content">
  //     <a href="#modal1" class="card-title modal-trigger">${food.name}</a>
        
  //     </div>
  //     <div class="modal-footer">
  //       <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
  //     </div>
  // </div>  
  // const inputFood = document.getElementById('search');
  // filterFood(inputFood,data);
  // console.log(filterFood);
}




const handleError = () => {
  alert('Se ha presentado un error');
}


const getFood = () => {
  const foodRequest = new XMLHttpRequest();
  foodRequest.open('GET', `data.json`);
  foodRequest.onload = addFood;
  foodRequest.onerror = handleError;
  foodRequest.send();
}


