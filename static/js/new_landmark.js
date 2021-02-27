function add_landmark(){
    document.getElementById("overlay").style.display="block";
    // get data from inputs
    var landmark_name=document.getElementById("landmark_name").value;
    var short_description=document.getElementById("short_description").value;
    var landmark_tags=document.getElementById("landmark_tags").value;

    if(false){
        //validate data
    }
    else{
        try{
        document.getElementById("overlay").style.display="block";
        let photo_id=uuidv4().toString();
        const uploadTask = storageRef.child("landmarks").child(photo_id).put(selectedFile); //create a child directory called images, and place the file inside this directory
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          ShowAlert(error.toString());
          return 0; 
        }, () => {
            db.collection('landmarks').doc(uuidv4().toString()).set({
                short_description:short_description,
                landmark_name:landmark_name,
                stories:[],
                latitude:latitude,
                longitude:longitude,
                is_crowded:is_crowded,
                photo_id:photo_id,
            }).then(() => {
                //clear inputs
            })
            .catch(function(error) {
                document.getElementById("overlay").style.display="none";
                console.log(error);
              })
            alert("connected");
            document.getElementById("overlay").style.display="none";
           console.log('Added all');
        });   
    }catch(e){
        console.log(e.toString());
    }
} 
}

function geoFindMe() {

    const status = document.querySelector('#landmark_location');
    const mapLink = document.querySelector('#map-link');
  
    //mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
    //   mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }