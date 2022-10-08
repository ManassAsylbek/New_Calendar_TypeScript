export type loginType = {
    "login":string
    "password":string
}
export type passwordType = {
    "confirmPassword":string
    "password":string
}


export interface IUser {
    "avatar":string
    "name": string,
    "email": string,
    "department": string,
    "position": string,
    "password": string,
    confirmPassword:string,
    "id": number
}