import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignupDetails } from '../../models/signup-details.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  signUpSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signUpForm = new FormGroup({
      'name': new FormControl(''),
      'lastname': new FormControl(''),
      'username': new FormControl(''),
      'password': new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl('')

    })
  }

  signUp(){
    const userCred: SignupDetails = this.signUpForm.getRawValue();
    this.signUpSubscription = this.authService.signup(userCred).subscribe()
  }

  ngOnDestroy(): void {
      this.signUpSubscription?.unsubscribe();
  }

}
