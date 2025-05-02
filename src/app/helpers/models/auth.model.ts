export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse{
    access_token:string,
    refresh_token:string
}

export interface RegisterData{
    email: string,
    name: string,
    password: string
}
export interface RegisterResponse{
    name?: string,
    email?: string,
    avatar?: string,
    id?: number,
    creationAt?: any,
    updatedAt?: any,
    path?: string,
    timestamp?: number,
    code?: any,
    message?: any,
    error:string,
    statusCode:number,
}