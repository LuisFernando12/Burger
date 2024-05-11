export interface IToken{
    access_token: string,
    expireIn: number,
    userId: number
}
export interface ITokenUpdate{
    access_token: string,
    expireIn: number,
}

export interface IGeneretedToken{
    userId?: number,
    token?: string | null
}