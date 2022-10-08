import { initializeApp} from "firebase/app";
import { getFirestore, doc, getDoc, setDoc,QueryDocumentSnapshot } from 'firebase/firestore';
import {User} from "firebase/auth";
import {IUser} from "../Intarface/IUser";
import {IUserInfo} from "../Intarface/IFirebase";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};



const app = initializeApp(firebaseConfig);


export const db = getFirestore();



export const createUserDocumentFromAuth = async (userAuth:User,userInfo={} as IUserInfo)/*:Promise<void | QueryDocumentSnapshot>*/ => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { /*displayName,*/ email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                email,
                createdAt,
                ...userInfo
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }

    return userDocRef;
};
