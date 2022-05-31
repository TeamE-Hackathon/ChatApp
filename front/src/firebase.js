import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBwOQEy0Q8NoWfcEkcj3p8p7hOsYG9L7cU',
  authDomain: 'rt5he-chatapp.firebaseapp.com',
  projectId: 'rt5he-chatapp',
  storageBucket: 'rt5he-chatapp.appspot.com',
  messagingSenderId: '73454058096',
  appId: '1:73454058096:web:562a225e44d1f0dfbdd2b5',
  measurementId: 'G-EGEFMMLKHS',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
