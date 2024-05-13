export interface IToken{
    access_token: string,
    expireIn: number,
    userId: number
}
export interface ITokenUpdate{
    access_token: string,
    expireIn: number,
}

export interface ISaveToken{
    userId?: number,
    token?: string | null
}
export interface IGenereteToken{
    sub: number,
    username: string,
    name:string
}
