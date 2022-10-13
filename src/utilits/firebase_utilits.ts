import { initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
    UserCredential,
    updateProfile
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import {AdditionalInformation} from "../Intarface/IFirebase";
import {IAuth, IUser} from "../Intarface/IUser";
import {IEvent, IEventAdd} from "../Intarface/IEvent";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};



const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

type ObjectToAdd = {
    title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};

type CategoryData = {
    imageUrl: string;
    items: CategoryItem[];
    title: string;
};

export const getUsersAndDocuments = async (): Promise<IUser[]> => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as IUser
    );
};
export const getEventsAndDocuments = async (): Promise<IEvent[]> => {
    const collectionRef = collection(db, 'events');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    let Events: { [x: string]: any; }[]=[] /*as IEvent[]*/
     querySnapshot.docs.forEach((docSnapshot) =>Events.push({...docSnapshot.data(),id:docSnapshot.id}));
     return Events as IEvent[]
};

export const createEventsDocumentFromAuth = async (userAuth: User,event={} as IEventAdd )=>{
    const eventDocRef = doc(db, 'events', userAuth.uid);
    let userSnapshot = await getDoc(eventDocRef);
    if (!userSnapshot.exists()) {
        try {
            await setDoc(eventDocRef, {
                ...event,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
}

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<IAuth>> => {
 /*   if (!userAuth) return;*/
    if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
            displayName: additionalInformation.displayName,
            photoURL: "https://cdn.pixabay.com/photo/2016/11/10/12/33/model-1814200__340.jpg",
            /*department:additionalInformation.department,*/
           /* position:additionalInformation.position,*/

        })
    }
    const userDocRef = doc(db, 'users', userAuth.uid);
    let userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const {displayName, email,uid} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                id:uid,
                photoURL:"https://cdn.pixabay.com/photo/2016/01/25/19/48/man-1161337__340.jpg",
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
//нужно возврашать инфо из users текушего пользователя
    return userSnapshot as QueryDocumentSnapshot<IAuth>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    //if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
   /* if (!email || !password) return;*/



    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};


/*
export const createUserDocumentFromAuth = async (userAuth:User,additionalInformation:UserInfo = {} as IUserInfo)/!*:Promise<void | QueryDocumentSnapshot>*!/ => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the User', error);
        }
    }

    return userDocRef;
};
*/
