import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import 'rxjs/add/operator/finally';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @Output()
  private loginEvent = new EventEmitter<boolean>();

  private currentUser;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.authenticate();
  }

  authenticate() {
    this.loginService
      .authenticate()
      .finally(() => {
        console.log('Authentication done.');
      })
      .subscribe(
        templateUser => {
          console.log('Authentication success.');
          this.currentUser = templateUser;
          sessionStorage.setItem(
            'currentUser',
            JSON.stringify(this.currentUser)
          );
          this.loginEvent.emit(true);
        },
        error => {
          console.log('Authentication fail.');
          this.loginEvent.emit(false);
        }
      );
  }
}
