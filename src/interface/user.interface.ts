export interface CreateUser{
    name: string,
    documentNumber: string,
    email: string,
    password: string
}
export interface UpdateUser{
    name: string | null,
    documentNumber: string | null,
    email: string | null,
}
// export type  User={
//     id: number;
//     name: string;
//     documentNumber: string;
//     email: string;
//     password: string;
//     createdAt: Date;
//     updateAt: Date;
//     active: boolean;
// }