export type loginType = {
    "login":string
    "password":string
}
export type passwordType = {
    "confirmPassword":string
    "password":string
}

export interface IUser {
    "photoURL"?: string | undefined
    "displayName": string,
    "email": string,
    "department": string,
    "position": string,
    "id": string
}

export interface IUserSignUp {
    "photoURL": string | undefined
    "displayName": string,
    "email": string,
    "department": string,
    "position": string,
    "password": string,
    confirmPassword:string,
    "id": string
}