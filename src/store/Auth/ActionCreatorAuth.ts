
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword, signOutUser
} from "../../utilits/firebase_utilits";
import {User} from 'firebase/auth';
import {AppDispatch} from "../store";
import {AuthFetching, AuthFetchingSuccess, AuthFetchingError,removeUser} from "./authSlice"
import {AdditionalInformation} from "../../Intarface/IFirebase";
import {IUser, IUserSignUp} from "../../Intarface/IUser";





export const signOut = () => async (dispatch: AppDispatch) => {

    try {
        await signOutUser()
        dispatch(removeUser())
    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}

export const getSnapshotFromUserAuth = (userAuth: User,
                                        additionalDetails?: AdditionalInformation) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const userSnapshot = await createUserDocumentFromAuth(userAuth, additionalDetails)
        dispatch(AuthFetchingSuccess({
            ...userSnapshot.data()
        }))
    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}

export const signUp = (data: IUserSignUp) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const {user} = await createAuthUserWithEmailAndPassword(data.email, data.password)
        console.log(user)
        const userSnapshot = await createUserDocumentFromAuth(user,
            {displayName: data.displayName, department: data.department, position: data.position})
        dispatch(AuthFetchingSuccess({
            displayName: data.displayName,
            department: data.department,
            position: data.position,
            email: user.email,
            id: user.uid,
            token: user.refreshToken}))
    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}

export const isUserAuthenticated = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const user = await getCurrentUser()
        console.log(user)
        if (!user) return ;
        dispatch(AuthFetchingSuccess({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            displayName: user.displayName,
            department: "user.department",
            position: "user.position",
        }));
        await getSnapshotFromUserAuth(user)

    } catch (e) {
// @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}


export const signInWithEmail = (data: { email: string, password: string }) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthFetching())
        const {user} = await signInAuthUserWithEmailAndPassword(data.email, data.password)
        if (user) {
            await getSnapshotFromUserAuth(user);
        }
        dispatch(AuthFetchingSuccess({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            displayName: user.displayName,
            department: "user.department",
            position: "user.position",
        }))
    } catch (e) {
        // @ts-ignore
        dispatch(AuthFetchingError(e.message))
    }
}


/*
export const fetchAuth = createAsyncThunk(
    "Auth/fetchAll",
    async (data: {email:string,password:string},thunkApi) => {
        try {

            const {user} = await signInAuthUserWithEmailAndPassword(data.email,data.password)
            return {
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
                displayName:user.displayName,
            /!*    department: user.department,
                position: user.position,*!/
            }
            /!*const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users")*!/
            /!*return response.data*!/
        } catch (e) {
            return thunkApi.rejectWithValue("не удалось загрузить")
        }

    }
)*/
