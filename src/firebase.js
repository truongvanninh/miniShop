import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
Vue.use(VueFire)
var config = {
    apiKey: "AIzaSyAohLYZnJicPJzu64iWAkejtYgvdB1Wn3o",
    authDomain: "huan-593d3.firebaseapp.com",
    databaseURL: "https://huan-593d3.firebaseio.com",
    projectId: "huan-593d3",
    storageBucket: "huan-593d3.appspot.com",
    messagingSenderId: "663131325316"
};
const firebaseApp = firebase.initializeApp(config)
// Export the database for components to use.
export const db = firebaseApp.database()
export const auth = firebaseApp.auth()
export const storage = firebaseApp.storage()
export const storageRef = firebaseApp.storage().ref()