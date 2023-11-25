// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCTWS_PWsibrcH9NQKjM1ExVQxE2jaBewc',
  authDomain: 'weather-on-letna-app.firebaseapp.com',
  projectId: 'weather-on-letna-app',
  storageBucket: 'weather-on-letna-app.appspot.com',
  messagingSenderId: '810094103229',
  appId: '1:810094103229:web:ea5827b20faa6b6f96c5d4',
  measurementId: 'G-SK1RF6LNM9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
