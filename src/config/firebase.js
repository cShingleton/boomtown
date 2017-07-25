import * as firebase from 'firebase';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAcm7Nn_LUwxyroCIqXqq8tiA_efS6XU8Q',
    authDomain: 'boomtown-92722.firebaseapp.com',
    databaseURL: 'https://boomtown-92722.firebaseio.com',
    projectId: 'boomtown-92722',
    storageBucket: 'boomtown-92722.appspot.com',
    messagingSenderId: '114426955025'
};

const FireBaseApp = firebase.initializeApp(config);
const FireBaseAuth = FireBaseApp.auth();
const FireBaseDB = firebase.database();

export {
    FireBaseApp,
    FireBaseAuth,
    FireBaseDB
};
