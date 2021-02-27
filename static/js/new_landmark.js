
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

function ShowAlert(txt){
    alert(txt);
}

function add_landmark(){
    document.getElementById("overlay").style.display="block";
    // get data from inputs
    var landmark_name=document.getElementById("landmark_name").value;
    var short_description=document.getElementById("short_description").value;
    var landmark_type=document.getElementById("landmark_type").value;   
    var is_crowded=document.getElementById("is_crowded").value;

    if(false){
        if(landmark_name==""){
            document.getElementById("overlay").style.display="none";
            ShowAlert("Landmark name filed cannot be null");
        }
        else if(short_description==""){
            document.getElementById("overlay").style.display="none";
            ShowAlert("Description field cannot be null");
        }
        else if(landmark_type="..."){
            document.getElementById("overlay").style.display="none";
            ShowAlert("Landmark type field cannot be null");
        }
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
                landmark_type:landmark_type,
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