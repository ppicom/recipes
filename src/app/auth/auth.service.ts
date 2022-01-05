import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  exhaustMap,
  map,
  Observable,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment';
import User from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

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
      .pipe(catchError(this.handleAuthError));
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
      .pipe(catchError(this.handleAuthError));
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
}

export type FirebaseAuthData = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};
