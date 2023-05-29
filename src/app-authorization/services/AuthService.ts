import axios from 'axios';
import { Moment } from "moment";
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';
import moment from 'moment';
import { LocalStorageKeys } from '../../common/constants';

const API_URL = '/auth'; // your API endpoint

const AuthService = {
  registerUser(registerRequest: RegisterRequest): Promise<boolean> {
    return axios.post<AuthResponse>(`${API_URL}/register`, registerRequest).then(res => {
        this.setSession(res.data);
        return true;
      }).catch(err => {
        console.log(err);
        return false;
      });
  },

  loginUser(loginRequest: LoginRequest): Promise<boolean> {
    return axios.post(`${API_URL}/login`, loginRequest)
      .then(res => {
        this.setSession(res.data);
        return true;
      }).catch(err => {
        console.log(err);
        return false;
      });
  },

  logout() {
    localStorage.removeItem(LocalStorageKeys.token);
    localStorage.removeItem(LocalStorageKeys.expiresAt);
    localStorage.removeItem(LocalStorageKeys.userId);
  },

  isLoggedIn() {
    console.log(moment().isBefore(this.getExpiration()));
    return moment().isBefore(this.getExpiration());
  },

  getExpiration(): Moment | null {
    const expiration = localStorage.getItem(LocalStorageKeys.expiresAt);
    return expiration ? moment(JSON.parse(expiration)) : null;
  },

  setSession(auth: AuthResponse) {
    const expiresAt = moment().add(auth.expiresIn, 'second');
    localStorage.setItem(LocalStorageKeys.token, auth.token);
    localStorage.setItem(LocalStorageKeys.expiresAt, JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(LocalStorageKeys.userId, auth.userId);
  }
}

export default AuthService;