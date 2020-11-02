import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './user.model';

export interface AuthResponseDate {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) { }



  signup(email: string, password: string) {
    return this.http.post<AuthResponseDate>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeiB1arh05GPYM6zAfSjwlx7ON_rakAII',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentification(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn)
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseDate>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeiB1arh05GPYM6zAfSjwlx7ON_rakAII',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentification(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }


    const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);

   this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  private handleAuthentification(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This mail does not exis.!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
