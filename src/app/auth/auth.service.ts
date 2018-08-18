import { Injectable  } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";


@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) {
        
    }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    logout() {
        this.user = null;
        this.authChange.next(true);
        this.router.navigate(['/login']);
    }

    getUser() {
        // To not provide direct access to the User class
       return { ...this.user }; 
    }

    isAuth() {
        return this.user != null;
    }
    private authSuccessfully() {
        // not emit but next as per rxjs
        this.authChange.next(true);
        // TODO: Change to go to Welcome page or the last project, skill, venture visited
        this.router.navigate(['/project']);
    }
}