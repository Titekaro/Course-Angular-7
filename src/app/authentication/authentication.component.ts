import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationResponseData, AuthenticationService} from "../services/authentication/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  @ViewChild('authForm') authForm: NgForm;

  loginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  authenticationObserver: Observable<AuthenticationResponseData>;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;

    if (this.loginMode) {
      this.authenticationObserver = this.authenticationService.signIn(email, password);
    } else {
      this.authenticationObserver = this.authenticationService.signUp(email, password);
    }

    this.authenticationObserver.subscribe(
      responseData => {
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.isLoading = false;
      });
  }

  private onCloseModal() {
    this.error = null;
  }
}
