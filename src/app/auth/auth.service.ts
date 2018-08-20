import { Injectable  } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { ProjectService } from '../project/project.service';


@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private projectService: ProjectService
    ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                // not emit but next as per rxjs
                this.authChange.next(true);
                // Changed /project to / to go to Welcome page or the last project, skill, venture visited
                this.router.navigate(['/']);
            } else {
                this.projectService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }

}