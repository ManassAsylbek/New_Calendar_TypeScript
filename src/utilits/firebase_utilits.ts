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
    UserCredential,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteUser
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    addDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    deleteDoc,
} from 'firebase/firestore';
import {AdditionalInformation} from "../Intarface/IFirebase";
import {IUser} from "../Intarface/IUser";
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
            photoURL: additionalInformation.photoURL,
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


///////delete auth user//////////////////////////////////////

export const deleteAuthUser = async () => {
    const user = auth.currentUser;
    if (user) {
        await deleteUser(user)
    }
}

///////update auth user//////////////////////////////////////
export const updatePasswordAuthUser = async (password: string) => {
    const user = auth.currentUser;
    if (user) {
        await updatePassword(user, password)
    }
}

export const updateEmailAuthUser = async (email: string) => {
    const user = auth.currentUser;
    if (user) {
        await updateEmail(user, email)
    }
}
export const updateAuthUser = async (additionalInformation = {} as AdditionalInformation) => {
    const user = auth.currentUser;
    if (user) {
        await updateProfile(user, {
            displayName: additionalInformation.displayName,
            photoURL: additionalInformation.photoURL,
        })
    }
}

///////update////////////////////////////////////////////////
export const setUpdateDoc = async (uId: string, docId: string, data: IMarker | IEvent | IUser) => {
    const dataDocRef = doc(db, uId, docId);
    try {
        await setDoc(dataDocRef, data)
        // @ts-ignore
        //await updateDoc(dataDocRef, data)
    } catch (err) {
        alert(err)
    }
}

/////////delete/////////////////////////////////////////////
export const setDeleteDoc = async (uId: string, docId: string) => {
    await deleteDoc(doc(db, uId, docId));
}

///////marker///////////////////////////////////////////////


export const setDefaultMarker = async (id: string): Promise<void> => {
    const markerDocRef = doc(db, `markers_${id}`, "default_marker");
    let markerSnapshot = await getDoc(markerDocRef)
    if (!markerSnapshot.exists()) {
        await setDoc(markerDocRef, {
            label: "рабочий",
            value: "#445370"
        })
    }
}

export const getMarkerAndDocuments = async (id: string): Promise<IMarker[]> => {

    const collectionRef = collection(db, `markers_${id}`);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    let Markers: { [x: string]: any; }[] = []
    querySnapshot.docs.forEach((docSnapshot) => Markers.push({...docSnapshot.data(), id: docSnapshot.id}));
    return Markers as IMarker[]
};

export const createMarkersDocumentFromAuth = async (id: string, marker = {} as IMarker) => {

    const markerCollRef = collection(db, `markers_${id}`)
    await setDoc(doc(markerCollRef), {...marker})

}

///////event///////////////////////////////////////////////////////////


export const createEventsDocumentFromAuth = async (id: string, event = {} as IEvent) => {

    const eventDocRef = collection(db, `events_${id}`);

    try {
        await addDoc((eventDocRef), event)
    } catch (err) {
        console.log(err)
    }


}


export const getEventsAndDocuments = async (id: string): Promise<IEvent[]> => {

    const collectionRef = collection(db, `events_${id}`);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    let Events: { [x: string]: any; }[] = [] /*as IEvent[]*/
    querySnapshot.docs.forEach((docSnapshot) => Events.push({...docSnapshot.data(), id: docSnapshot.id}));
    return Events as IEvent[]
};






