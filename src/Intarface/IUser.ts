export type loginType = {
    "login":string
    "password":string
}

export interface IUser {
    "avatar":string
    "surname": string,
    "name": string,
    "middleName": string,
    "email": string,
    "department": string,
    "position": string,
    "login":loginType,
    "password"?:string
    "id": number
}