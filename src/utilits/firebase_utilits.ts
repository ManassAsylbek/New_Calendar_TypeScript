import {initializeApp} from "firebase/app";
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
import {IMarker} from "../Intarface/IMarker";


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


export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
): Promise<void> /*Promise<QueryDocumentSnapshot<IAuth>>*/ => {
    if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
            displayName: additionalInformation.displayName,
            photoURL: "https://cdn.pixabay.com/photo/2016/11/10/12/33/model-1814200__340.jpg",
        })
    }
    const {displayName, email, uid} = userAuth
    const userDocRef = doc(db, 'users', uid);
    let userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                id: uid,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
//нужно возврашать инфо из users текушего пользователя
    //return userSnapshot as QueryDocumentSnapshot<IAuth>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {


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
///////users

export const getUsersAndDocuments = async (): Promise<IUser[]> => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as IUser
    );
};

export const getUser = async (uid: string) => {
    let userDocRef = doc(db, 'users', uid);


    let userSnapshot = await getDoc(userDocRef);
    return userSnapshot.data()

}

///////marker
export const getMarkerAndDocuments = async (id: string): Promise<IMarker[]>=> {

    const collectionRef = collection(db, `markers_${id}`);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    let Markers: { [x: string]: any; }[] = []
    querySnapshot.docs.forEach((docSnapshot) => Markers.push({...docSnapshot.data(), id: docSnapshot.id}));
    return Markers as IMarker[]
};

export const createMarkersDocumentFromAuth = async (id: string, marker = {} as IMarker) => {

    const eventDocRef = collection(db, `markers_${id}`);
    await setDoc(doc(eventDocRef), {...marker})
}

///////event

export const getEventsAndDocuments = async (id: string): Promise<IEvent[]> => {

    const collectionRef = collection(db, `events_${id}`);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    let Events: { [x: string]: any; }[] = [] /*as IEvent[]*/
    querySnapshot.docs.forEach((docSnapshot) => Events.push({...docSnapshot.data(), id: docSnapshot.id}));
    return Events as IEvent[]
};


export const createEventsDocumentFromAuth = async (id: string, event = {} as IEventAdd) => {

    const eventDocRef = collection(db, `events_${id}`);
    const ev = doc(eventDocRef)
    await setDoc(doc(eventDocRef), {...event, author: id})

    /*  let userSnapshot = await getDoc(ev);
      if (!userSnapshot.exists()) {
          try {
              await setDoc(ev, {
                  title:"a6565"
              });
          } catch (error) {
              console.log('error creating the user', error);
          }
      }*/

    /*const eventDocRef = doc(db, `events_${id}`);
    let userSnapshot = await getDoc(eventDocRef);

    if (!userSnapshot.exists()) {
        try {
            await setDoc(eventDocRef, {
                title:"hello"
              /!*  ...event,
                author:id,*!/
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }*/
}
export const creat = async () => {
    console.log(console.log(auth))
    const citiesRef = collection(db, "cities");

    /*   await setDoc(doc(citiesRef, "SF"), {
           name: "San Francisco", state: "CA", country: "USA",
           capital: false, population: 860000,
           regions: ["west_coast", "norcal"] });
       await setDoc(doc(citiesRef, "LA"), {
           name: "Los Angeles", state: "CA", country: "USA",
           capital: false, population: 3900000,
           regions: ["west_coast", "socal"] });
       await setDoc(doc(citiesRef, "DC"), {
           name: "Washington, D.C.", state: null, country: "USA",
           capital: true, population: 680000,
           regions: ["east_coast"] });
       await setDoc(doc(citiesRef, "TOK"), {
           name: "Tokyo", state: null, country: "Japan",
           capital: true, population: 9000000,
           regions: ["kanto", "honshu"] });
       await setDoc(doc(citiesRef, "BJ"), {
           name: "Beijing", state: null, country: "China",
           capital: true, population: 21500000,
           regions: ["jingjinji", "hebei"]
       });*/
}


