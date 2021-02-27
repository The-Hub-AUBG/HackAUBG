// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLpz3TzQLHVrRC5HoWTWezYX5KlDmm4iw",
    authDomain: "hackaubg-a6add.firebaseapp.com",
    projectId: "hackaubg-a6add",
    storageBucket: "hackaubg-a6add.appspot.com",
    messagingSenderId: "925174327710",
    appId: "1:925174327710:web:a5f087eaf2fa2d06df0e8f",
    measurementId: "G-KD5CHKS4FR"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //make auth and firestore ref
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storageService = firebase.storage();
    const storageRef = storageService.ref();