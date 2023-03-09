import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const app=firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID,
});


 const firestore=app.firestore()
 export const database={
  folders:firestore.collection('folders'),
  files:firestore.collection('files'),
  formatDoc:doc=>{
    return {id:doc.id,...doc.data()}
  },
  getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
 }


 export const storage=app.storage()
export const auth=app.auth()

export default app