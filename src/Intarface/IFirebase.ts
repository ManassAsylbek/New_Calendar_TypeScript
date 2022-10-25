export interface IUserInfo {
    /*photoURL:string*/
    department:string
    displayName:string
    position:string
}

export type AdditionalInformation = {
    displayName?: string;
    position?:string
    department?:string
    photoURL?:string,
};