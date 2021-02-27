function add_landmark(){
    // get data from inputs
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