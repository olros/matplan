import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC5qznf0RxNbKdHRdQKW2KRh5aIW-QWuZ4',
  authDomain: 'matplan-2020.firebaseapp.com',
  databaseURL: 'https://matplan-2020.firebaseio.com',
  projectId: 'matplan-2020',
  storageBucket: 'matplan-2020.appspot.com',
  messagingSenderId: '87654811544',
  appId: '1:87654811544:web:979de2cd6a0e817a950ded',
  measurementId: 'G-2WXW795XVL',
};
let analytics;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  analytics = firebase.analytics();
}
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth, analytics };
export default firebase;
