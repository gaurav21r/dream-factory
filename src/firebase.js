import {initializeApp} from 'firebase/app';
import {
  initializeFirestore, 
  CACHE_SIZE_UNLIMITED,
  query, 
  getDocs, 
  setDoc, 
  collection,
  disableNetwork,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  setLogLevel
} from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAZKiwwf6TbJJQdy--4LG2flJCpSAx7dZk",
  authDomain: "dream-factory-3bb67.firebaseapp.com",
  projectId: "dream-factory-3bb67",
  storageBucket: "dream-factory-3bb67.appspot.com",
  messagingSenderId: "242960121837",
  appId: "1:242960121837:web:f56c55f2b5019f96e8b1e4",
  measurementId: "G-BB7HEFVQZ8"
})
const firestore = initializeFirestore(firebaseApp, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  setLogLevel: 'debug'
})
enableMultiTabIndexedDbPersistence(firestore)
//enableIndexedDbPersistence(firestore)
.catch((err) => {
  if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
  } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
  }
});

disableNetwork(firestore)
export {
  firebaseApp,
  firestore
}