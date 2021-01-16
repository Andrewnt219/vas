import firebase from 'firebase/app';
import 'firebase/firestore';

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyAD3L8ZYtaFEUsGIIqbcvbtkiiopz1ArMg',
		authDomain: 'vas-seneca.firebaseapp.com',
		projectId: 'vas-seneca',
		storageBucket: 'vas-seneca.appspot.com',
		messagingSenderId: '1070812870962',
		appId: '1:1070812870962:web:f5645dab23a957d8c77f2b',
		measurementId: 'G-6PGPNXYM4H',
	});
}

export default firebase.firestore();
