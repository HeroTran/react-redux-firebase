import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBUcZ0HgLOIFII7-OmaMzEA5MkqX8JndB0',
  authDomain: 'addressvietnam-ea550.firebaseapp.com',
  databaseURL: 'https://addressvietnam-ea550.firebaseio.com'
};


firebase.initializeApp(config);
const database = firebase.database();

export default database;
