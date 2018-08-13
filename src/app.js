window.onload = () => {  
  const preload = setTimeout( () => {
    document.getElementById("loader").classList.add('hidden');
    document.getElementById("container").classList.remove('hidden');
    }, 2000);
}

window.initMap = () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((ubiety) => {
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
      });
      
    });

    const error = (error) => {
      alert(error);
    }
  
  } else {
    alert(error);
  }
}

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

const locationFood = (latitude, longitude) => {
  const positionFood = new google.maps.LatLng(latitude, longitude);
  map = new google.maps.Map(document.getElementById ('map'), {
    center: positionFood,
    zoom: 18
  });

  const myMarker = new google.maps.Marker({
    position: positionFood,
    map: map
  });
}

const dataTable = (data) => {
  const showFood = document.getElementById('container-food');
  showFood.innerHTML = '';
  Object.keys(data).forEach((id) => {
    const food = data[id];
    showFood.innerHTML += `
    <div class="row" id=${id}>
      <div class="col s12 m12">
        <div class="card horizontal">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${food.image}" alt="image food" width="400px" height="300px">
          </div>

          <div class="card-content black-text">
            <p class="card-title activator">${food.name}</p>
            <p><a href="#" onclick="locationFood('${food.latitude}','${food.longitude}')">Ver Ubicación</a></p>
          </div>

          <div class="card-reveal black">
            <span class="card-title white-text text-darken-4">${food.name}
            <i class="material-icons right">close</i></span>
            <p>Dirección: ${food.address}</p>
            <p>Tel. reserva: ${food.phone}</p>
            <p>Tipo de comida: ${food.typeFood}</p>
          </div>
        </div>
      </div>
    </div>
    `  
  })
}


const listFood = () => {
  getFood(() => {
    const dataFood = JSON.parse(event.currentTarget.responseText); 
    dataTable(dataFood);
  })
}

const filterRestaurant = (foods, search, filterOption) => {
  let filterFoods;
  switch (filterOption) {
    case "name" :
      filterFoods = foods.filter((food) => { 
        return food.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      return filterFoods;
      break;
    
    case "district" :
      filterFoods = foods.filter((city) => { 
        return city.district === search;
      });
      return filterFoods;
      break;

    case "type" :
      filterFoods = foods.filter((type) => {
      return type.typeFood === search;
      });
      return filterFoods;
      break;
  }
  
} 

const filterFood = () => {
  getFood(() => {
    const dataFood = JSON.parse(event.currentTarget.responseText); 
    const searchFood = document.getElementById('search');
    const filterDistrict = document.getElementById('district');
    const filterType = document.getElementById('typeFood');

    searchFood.addEventListener('keyup', () => {
      let search = searchFood.value;
      let selectFood = filterRestaurant(dataFood, search, "name");
      dataTable(selectFood);
    })

    filterDistrict.addEventListener('change', (e) => {
      let district = e.target.value;
      if (district != '') {
        let selectDistrict = filterRestaurant(dataFood, district, "district");
        dataTable(selectDistrict);
      } else {
        listFood();
      }
      
    })

    filterType.addEventListener('change', (e) => {
      let typeFood = e.target.value;
      if (typeFood != '') {
        let selectType = filterRestaurant(dataFood, typeFood, "type");
        dataTable(selectType);
      } else {
        listFood();
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems);
});

listFood();
filterFood();
getFood();
