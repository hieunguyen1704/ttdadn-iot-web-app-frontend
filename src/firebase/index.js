import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDQPxsvMja0XNqIwB_Y1mFyOW5Oi_MnCBM",
  authDomain: "ttdadn-2017.firebaseapp.com",
  databaseURL: "https://ttdadn-2017.firebaseio.com",
  projectId: "ttdadn-2017",
  storageBucket: "ttdadn-2017.appspot.com",
  messagingSenderId: "951477280580",
  appId: "1:951477280580:web:9a7f67d704b7ea18090111",
  measurementId: "G-LF6M4YZCTY",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
