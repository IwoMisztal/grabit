import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  isUserLoggedIn: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.user = new User();
    if (this.authService.isAuthenticated()) {
        this.router.navigate(['']);
      }
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.user).subscribe(() =>{
      this.authService.login(this.user).subscribe(q =>
        this.router.navigate(['']));
    }, error => {
      console.log(error);
    });
  }

}
