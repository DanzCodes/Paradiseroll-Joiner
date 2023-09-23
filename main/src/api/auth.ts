import axios from "./axios";

interface ILoginUser {
    email: string,
    password: string
}

interface IRegisterUser extends ILoginUser {
    nickname: string,
}

export const login = (user: ILoginUser) => axios.post('/login', user);
export const signup = (user: IRegisterUser) => axios.post('/signup', user);