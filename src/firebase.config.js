import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore}  from "firebase/firestore";
import {getStorage} from "firebase/storage" 

const firebaseConfig = {
    apiKey: "AIzaSyD6tqc0jPaSE5W6tYmWn5ZVXKFRWsQHdZ4",
    authDomain: "bikerentalapp-85ec4.firebaseapp.com",
    databaseURL: "https://bikerentalapp-85ec4-default-rtdb.firebaseio.com",
    projectId: "bikerentalapp-85ec4",
    storageBucket: "bikerentalapp-85ec4.appspot.com",
    messagingSenderId: "814727510737",
    appId: "1:814727510737:web:32c7daf1d277929a4ce3f0"
  };



  const app=getApps.Length>0 ? getApp():initializeApp(firebaseConfig);

  const db=getFirestore(app);
  const storage=getStorage(app);
  const firestore=getFirestore(app);


  export {app, firestore,storage};