import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAh4gJ6cv_jGWPkOPd3pZBvJdqGZZcxivU',
  authDomain: 'music-7afc7.firebaseapp.com',
  projectId: 'music-7afc7',
  storageBucket: 'music-7afc7.appspot.com',
  appId: '1:630170396482:web:189d212824f068e6328adb'
}

const app = firebase.initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }

export default app
