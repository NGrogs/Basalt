import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

/** database details and keys for Firebase database
 *  Real values are stored in .env file
*/
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID
};

firebase.initializeApp(config);

export default firebase;