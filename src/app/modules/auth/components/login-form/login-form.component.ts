import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginDetails } from '../../models/login-details.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.loginForm = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl(''),
    })
  }

  logIn(){
    const userCred: LoginDetails = this.loginForm.getRawValue()
    this.loginSubscription = this.authService.login(userCred).subscribe()
    this.loginForm.reset()
  }

  ngOnDestroy(): void {
      this.loginSubscription?.unsubscribe();
  }

}
