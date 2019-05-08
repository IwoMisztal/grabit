import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  values: any;
  user: User;

  constructor(public authService: AuthenticationService, private storage: Storage,
    private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
    this.storage.clear();
  }

  login() {
     this.authService.login(this.user).subscribe (() => {
       console.log('logged in successfully');
      //  this.isUserLoggedIn = this.authService.isUserLoggedIn;
     }, error => {
       console.log('login failed');
     });
  }

  loggedIn() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logOut();
  }
}
