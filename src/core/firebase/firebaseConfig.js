import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBJY8XkOkJCHibddPAQA6U0Au3arMGwzIg',
  authDomain: 'testing-78f20.firebaseapp.com',
  databaseURL: 'https://testing-78f20.firebaseio.com',
  projectId: 'testing-78f20',
  storageBucket: 'testing-78f20.appspot.com',
  messagingSenderId: '134267553868',
  appId: '1:134267553868:web:83aa83f215e70220cc8ce9',
  measurementId: 'G-WQKBP9V65Q',
};
// Initialize Firebase

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : null;
