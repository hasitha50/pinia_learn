import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {

  console.log(process.env.NUXT_DATABASE_ID)
const firebaseConfig = {
    apiKey: process.env.NUXT_FIREBASE_API_KEY,
    authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NUXT_FIREBASE_APP_ID,
    measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
  };
  
  const app = initializeApp(firebaseConfig);
  const db =getFirestore(app);

 return {
    provide: {
      firebaseApp: app,
      db,
    },
  }
})