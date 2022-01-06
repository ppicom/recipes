import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  exhaustMap,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment';
import User from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  session;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http
      .post<FirebaseAuthData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.api_key}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleAuthError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<FirebaseAuthData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.api_key}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleAuthError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  private handleAuthentication({
    email,
    expiresIn,
    idToken,
    localId,
  }: FirebaseAuthData) {
    const expiration = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expiration);
    this.user.next(user);
    this.autoLogout(+expiresIn * 1000)
    localStorage.setItem('user', JSON.stringify(user))
  }

  private handleAuthError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error has occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case 'INVALID_EMAIL':
          errorMessage =
            "Does that email look right to you bruh? C'mon, try a little harder.";
          break;
        case 'EMAIL_EXISTS':
          errorMessage =
            'Not so unique, uh! That email is taken you little shit.';
        default:
          break;
      }
      return throwError(() => errorMessage);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('user')
    if (this.session) {
      clearTimeout(this.session)
      this.session = null
    }
  }

  autoLogout(expirationDuration: number) {
    debugger;
    this.session = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  autoLogin() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const flatUser = JSON.parse(userString)
      const user = new User(flatUser.email, flatUser.ID, flatUser._token, new Date(flatUser._tokenExpiration))

      if (user.token) {
        this.user.next(user)
        this.autoLogout(new Date(flatUser._tokenExpiration).getTime() - new Date().getTime())
      }
    }
  }

}

export type FirebaseAuthData = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};
