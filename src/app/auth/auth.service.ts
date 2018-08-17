import { Subject } from 'rxjs/Subject';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        // not emit but next as per rxjs
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
    }

    getUser() {
        // To not provide direct access to the User
       return { ...this.user }; 
    }

    isAuth() {
        return this.user != null;
    }
}