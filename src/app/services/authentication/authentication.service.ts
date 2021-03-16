import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import * as config from '../../../../config.json';
import {User} from "../../models/user.model";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

export interface AuthenticationResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  signUpApiURL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + config.firebaseApiKey;
  signInApiURL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + config.firebaseApiKey;
  user = new BehaviorSubject<User>(null);
  tokenExpirationDelay;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthenticationResponseData>(this.signInApiURL, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      /*tap() allows to perform some actions without change the response. It runs some code with the datas you get back from the observable*/
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
      }),
      catchError(errorResponse => {
        return AuthenticationService.handleError(errorResponse);
      })
    );
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthenticationResponseData>(this.signUpApiURL, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
      }),
      catchError(errorResponse => {
        return AuthenticationService.handleError(errorResponse);
      })
    );
  }

  autoSignIn() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const activeUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationdate), userData.expiresIn);
    if (activeUser.token) { /* Method get token() (from the user model), that checks if we have a valid token */
      const tokenExpirationDate = new Date(new Date(userData._tokenExpirationdate).getTime() - new Date().getTime()).getTime();
      this.user.next(activeUser);
      this.autoSignOut(tokenExpirationDate);
    }
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
    if (this.tokenExpirationDelay) {
      clearTimeout(this.tokenExpirationDelay);
    }
    this.tokenExpirationDelay = null;
  }

  autoSignOut(tokenExpirationDuration: number) {
    this.tokenExpirationDelay = setTimeout(() => {
      this.signOut();
    }, tokenExpirationDuration);
  }

  private handleAuthentication(email: string, id: string, idToken: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, idToken, expirationDate, expiresIn);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/dashboard/home']);
    this.autoSignOut(+expiresIn * 1000);
  }

  private static handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);
  }
}
