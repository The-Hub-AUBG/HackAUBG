var position=0;
function show_register_tab(){
    document.getElementById("login_tab").style.display="none";
    document.getElementById("register_tab").style.display="block";
    document.getElementById("register_header").classList.add('active');
    document.getElementById("login_header").classList.remove('active');
    document.getElementById("login_tab_email").value="";
    document.getElementById("login_tab_password").value="";
    position=1;
}
function show_login_tab(){
    document.getElementById("register_tab").style.display="none";
    document.getElementById("login_tab").style.display="block";
    document.getElementById("register_header").classList.remove('active');
    document.getElementById("login_header").classList.add('active');
    document.getElementById("register_tab_email").value="";
    document.getElementById("register_tab_password").value="";
    document.getElementById("register_tab_repeat_password").value="";
    document.getElementById("register_tab_username").value="";
    document.getElementById("register_tab_photo").src="./img/picture_placeholder.png";
    document.getElementById("terms_and_conditions_check").value="";
    document.querySelector('.file-select').value="";
    position=0;
}
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
                if(position==0)login();
                else regis();
    }
  });
function login(){
    document.getElementById("overlay").style.display="block";
    firebase.auth().signInWithEmailAndPassword(document.getElementById("login_tab_email").value, document.getElementById("login_tab_password").value).then(cred=> {
        alert("connected");
        document.getElementById("overlay").style.display="none";
            document.getElementById("login_tab_email").value="";
            document.getElementById("login_tab_password").value="";
        console.log("Login Succes");
        // if firebase auth succeded querry username and user photo   
        localStorage.setItem("UserId",cred.user.uid);
        db.collection("users").doc(cred.user.uid).get().then(function(doc) {
            if (doc.exists) {
                localStorage.setItem("UserPhoto",doc.data().photo_id);
                localStorage.setItem("UserName",doc.data().username);
                location.href=localStorage.getItem("where_to") || "/user";
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });        
  }).catch(function(error) {
        document.getElementById("overlay").style.display="none";
        console.log(error);
        ShowAlert(error.toString());
  });
  }

let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
  document.getElementById("register_tab_photo").src=URL.createObjectURL(selectedFile);
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function ShowAlert(txt){
    alert(txt);
}
document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
function ShowAlert(message){
    alert(message);
}
function register(){
    document.getElementById("overlay").style.display="block";
    var register_tab_email=document.getElementById("register_tab_email").value;
    console.log(register_tab_email);
    var register_tab_password=document.getElementById("register_tab_password").value;
    var register_tab_repeat_password=document.getElementById("register_tab_repeat_password").value;
    var register_tab_username=document.getElementById("register_tab_username").value;
    if(register_tab_email==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Email field cannot be null");
    }
    else if(register_tab_password==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Password field cannot be null");
    }
    else if(register_tab_repeat_password==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Repeat Password field cannot be null");
    }
    else if(register_tab_username==""){
        document.getElementById("overlay").style.display="none";
        ShowAlert("Username field cannot be null");
    }
    else if(document.getElementById("terms_and_conditions_check").value==false){ 
        document.getElementById("overlay").style.display="none";
        ShowAlert("Please accept terms and conditions");   
    }
    else if(register_tab_password == register_tab_repeat_password) {
        auth.createUserWithEmailAndPassword(register_tab_email, register_tab_password)
       .then( cred => {
        localStorage.setItem("UserId",cred.user.uid);
            let photo_id=uuidv4().toString();
            localStorage.setItem("UserPhoto",photo_id);
            localStorage.setItem("UserName",register_tab_username);
            /// try to upload photo
            const uploadTask = storageRef.child("Users").child(photo_id).put(selectedFile); //create a child directory called images, and place the file inside this directory
            uploadTask.on('state_changed', (snapshot) => {
            }, (error) => {
              // Handle unsuccessful uploads
              console.log(error);
              ShowAlert(error.toString());
              return 0; 
            }, () => {
                db.collection('users').doc(cred.user.uid).set({
                    username: register_tab_username ,
                    photo_id:photo_id,
                    food:[],
                    visit_preferences:[],
                    budget:100,
                    currency:"dollar",
                    allow_crowded:true,
                    to_walk:"medium",
                    public_routes:[],
                    private_routes:[]
                }).then(() => {
                    location.href=localStorage.getItem("where_to") || "/user";
                })
                .catch(function(error) {
                    document.getElementById("overlay").style.display="none";
                    console.log(error);
                  })
                alert("connected");
                document.getElementById("overlay").style.display="none";
               console.log('Added all');
            });   
        }).catch(function(error) {
            if(selectedFile==undefined){
                db.collection('users').doc(localStorage.getItem("UserId")).set({
                    username: register_tab_username ,
                    photo_id:"picture_placeholder.png",
                    food:[],
                    visit_preferences:[],
                    budget:100,
                    currency:"dollar",
                    allow_crowded:true,
                    to_walk:"medium",
                    public_routes:[],
                    private_routes:[]
                }).then(() => {
                    localStorage.setItem("UserPhoto","picture_placeholder.png");
                    localStorage.setItem("UserName",register_tab_username);
                    location.href=localStorage.getItem("where_to") || "/user";
                })
                .catch(function(error) {
                    document.getElementById("overlay").style.display="none";
                    console.log(error);
                  })
                alert("connected");
                document.getElementById("overlay").style.display="none";
               console.log('Added all');
          
            }
            else{
            document.getElementById("overlay").style.display="none";
            console.log(error);
            ShowAlert(error.toString());}
          })
    
        }
        else {
            document.getElementById("overlay").style.display="none";
            ShowAlert("Passwords don't match");
        } 
}



