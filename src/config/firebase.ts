import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDgFDBtWJdtG9C1ibHt5O6rng-25CUz0f0",
    authDomain: "setmispace-f344a.firebaseapp.com",
    projectId: "setmispace-f344a",
    storageBucket: "setmispace-f344a.appspot.com",
    messagingSenderId: "212674361963",
    appId: "1:212674361963:web:0a0040946294e766744f2e",
};

firebase.initializeApp(firebaseConfig);

export const storage = getStorage();
