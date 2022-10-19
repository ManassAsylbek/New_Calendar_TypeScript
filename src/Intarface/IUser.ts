export type loginType = {
    "login":string
    "password":string
}
export type passwordType = {
    "confirmPassword":string
    "password":string
}

/*export interface IAuth {
    /!*"avatar":string*!/
    "photoURL": string | undefined
    "displayName": string|null,
    "email": string|null,
    "department": string|null,
    "position": string|null,
    "id": string,
    /!*"token":string|null,*!/
}*/


/*export interface IUser {
    avatar: string | undefined
    /!*"avatar":string*!/
    "displayName": string,
    "email": string,
    "department": string,
    "position": string,
    "password": string,
    confirmPassword:string,
    "id": number
}*/

export interface IUser {
    "photoURL": string | undefined
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