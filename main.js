let map;

function initMap() {
    const myLatLng = { lat: 9.19658, lng: 12.480737 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
}
function hhh(){
    
    var starCountRef = firebase.database().ref('incidents');
    starCountRef.on('value', (snapshot) =>{
        const data = snapshot.val();
        console.log(data);
    });
}

function hhh3(){
    //const db = firebase.firestore();
    const booksRef = firebase
  .firestore()
  .collection("incidents");

booksRef
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All data in 'books' collection", data); 
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
  });
}

function setCustomMarker(incident){
    var imageData;

    if(incident.category=="Fire and Smoke"){
        imageData = 'assets/images/fire_and_smoke.png';
      }else if(incident.category=="Hazardous Material"){
        imageData = 'assets/images/hazardous_materials.png';
      }else if(incident.category=="Lost Item"){
        imageData = 'assets/images/lost_item.png';
      }else if(incident.category=="Suspicious Activity"){
        imageData = 'assets/images/suspicious_activity.png';
      }else if(incident.category=="Accident"){
        imageData = 'assets/images/accident.png';
      }else if(incident.category=="Criminal"){
        imageData = 'assets/images/criminal.png';
      }else if(incident.category=="Medical"){
        imageData = 'assets/images/medical.png';
      }else if(incident.category=="Vehicle"){
          imageData = 'assets/images/vehicle.png';
      }else if(incident.category=="Weather"){
          imageData = 'assets/images/weather.png';
      }
      return imageData;
}

function createMarker(myLatLng, incident, icon) {
    var marker = new google.maps.Marker({
        position: myLatLng,
        title: incident.category,
        icon: icon,
    });
    google.maps.event.addListener(marker, 'click', function() { 
       //alert("I am marker " + marker.title +" -- "+incident.category); 
       var modal = document.getElementById("myModal");
       modal.style.display = "block";
       //set contents
       //modal.innerHTML("<h1>helllo</h1>");

       // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

    }); 
    return marker;  
}


function hhh4(map){
    firebase
  .firestore()
  .collection("incidents")
  .onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All data in 'books' collection", data);
    data.forEach(incident => {
        var myLatLng = { lat: incident.latitude, lng: incident.longitude };
        var icon = setCustomMarker(incident);
        var marker = createMarker(myLatLng, incident, icon);
        marker.setMap(map);
    });
  });
}

function hhh5(){
    firebase
  .firestore().collection('incidents').onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(function(doc) {
            console.log(doc.data());
        });
        console.log("Current cities in CA: ", cities.join(", "));
      });
}