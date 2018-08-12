window.onload = () => {  
  const preload = setTimeout( () => {
    document.getElementById("loader").classList.add('hidden');
    document.getElementById("container").classList.remove('hidden');
    }, 2000);
}

function initMap () {

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(ubiety){
  //     let map, infoWindow, service;

  //     const latitude = ubiety.coords.latitude;
  //     const longitude = ubiety.coords.longitude;

  //     const myPosition = new google.maps.LatLng(latitude, longitude);

  //     map = new google.maps.Map(document.getElementById ('map'), {
  //       center: myPosition,
  //       zoom: 18
  //     });

  //     const myMarker = new google.maps.Marker({
  //     position: myPosition,
  //     map: map
  //     }) 

  //     const inputSearch = document.getElementById('search');
  //     new google.maps.places.Autocomplete(inputSearch);
    
  //     var request = {
  //       location: myPosition,
  //       radius: '500',
  //       type: ['restaurant']
  //     };
    
  //     service = new google.maps.places.PlacesService(map);
  //     service.nearbySearch(request, callback);
    
  //     function callback(results, status) {
  //       if (status == google.maps.places.PlacesServiceStatus.OK) {
  //         for (var i = 0; i < results.length; i++) {
  //           var place = results[i];
  //           createMarker(results[i]);
  //         }
  //       }
  //     }

  //     function createMarker(place) {
           
  //       var image = {
  //           url: 'marcador.png',
  //           size: new google.maps.Size(71, 71),
  //           origin: new google.maps.Point(0, 0),
  //           anchor: new google.maps.Point(17, 34),
  //           scaledSize: new google.maps.Size(25, 25)
  //         };
      
  //         var marker = new google.maps.Marker({
  //           map: map,
  //           icon: image,
  //           title: place.name,
  //           position: place.geometry.location
  //         });
        
  //     }
  //   }, function(error){
  //     alert(error);
  //   });
  // } else {
  //   alert(error);
  // }

  
}






// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.modal');
//   var instances = M.Modal.init(elems);
// });





  

 


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





const handleError = () => {
  alert('Se ha presentado un error');
}


const getFood = (callback) => {
  const foodRequest = new XMLHttpRequest();
  foodRequest.open('GET', `data.json`);
  foodRequest.onload = callback;
  foodRequest.onerror = handleError;
  foodRequest.send();
}

const dataTable = (data) => {
  const showFood = document.getElementById('container-food');
  showFood.innerHTML = '';
  Object.keys(data).forEach((id) => {
    const food = data[id];
    showFood.innerHTML += `
    <div class="row" id=${id}>
      <div class="col s12 m6">
        <div class="card white">
          <div class="card-content black-text">
            <a class="modal-trigger" id=${id} href="#modal1"><h4>${food.name}</h4></a>
            <p>Dirección: ${food.address}</p>
            <p>Tel. reserva: ${food.phone}</p>
            <p>Tipo de comida: ${food.typeFood}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="modal1 ${id}" class="modal">
      <div class="modal-content">
        <h4>${food.name}</h4>
        <p>A bunch of text</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>

    `
    
    })
}

const modalFood = () => {
  const modal = `
  
  `
}

const listFood = () => {
  getFood(() => {
    const dataFood = JSON.parse(event.currentTarget.responseText); 
    dataTable(dataFood);
  })
}

const filterRestaurant = (foods, search) => {
  let filterFoods = foods.filter((food) => { 
  return food.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
  //console.log(filterFoods)
  return filterFoods;
} 

const filterFood = () => {
  getFood(() => {
    const dataFood = JSON.parse(event.currentTarget.responseText); 
    const searchFood = document.getElementById('search');
    const filterDistrict = document.getElementById('district');
    const filterType = document.getElementById('typeFood');

    searchFood.addEventListener('keyup', () => {
      let search = searchFood.value;
      console.log(search);
      let selectFood = filterRestaurant(dataFood, search);
      console.log(selectFood);
      dataTable(selectFood);
    })

    filterDistrict.addEventListener('change', (e) => {
      let district = e.target.value;
      console.log(district);
      let selectDistrict = dataFood.filter((city) => { 
        return city.district === district;
        });
      console.log(selectDistrict);
      dataTable(selectDistrict);
    })

    filterType.addEventListener('change', (e) => {
      let typeFood = e.target.value;
      console.log(typeFood);
      let selectType = dataFood.filter((type) => {
        return type.typeFood === typeFood;
      })
      console.log(selectType);
      dataTable(selectType);
    })

  })
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

listFood();
filterFood();
getFood();
