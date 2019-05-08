import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';


const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = 'https://localhost:44328/api/user/'
  authenticationState = new BehaviorSubject(false);
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  token: string;

  loggedInChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private storage: Storage) { 
  }

  login(user: User) {
      return this.http.post(this.baseUrl + 'login', user)
        .pipe(
          map((response: any) => {
            const token = response;
            if (token) {
              this.storage.set('token', token.token).then(() => {
                this.authenticationState.next(true);
              });
              this.token = token.token;
              this.decodedToken = this.jwtHelper.decodeToken(token.token);
            }
          })
        )
  }

   logOut() {
    return this.storage.remove('token').then(() =>{
      this.authenticationState.next(false);
    })
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  public isAuthenticated(): boolean {
    const token = this.token;
    console.log(token);
    if (token == null || token == "") {
      return false;
    }
    const isTokenExpired = !this.jwtHelper.isTokenExpired(token);
    return isTokenExpired;
  }
}
