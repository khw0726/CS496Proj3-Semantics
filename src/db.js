import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAHW_T08AWFfQdkV8fFXXEPRizdFWXpwnQ',
  authDomain: 'test001-9286a.firebaseapp.com',
  databaseURL: 'https://test001-9286a.firebaseio.com',
  storageBucket: 'test001-9286a.appspot.com',
  messagingSenderId: '650810461631'
}

let fb = firebase.initializeApp(config)
let db = fb.database()

export default db
