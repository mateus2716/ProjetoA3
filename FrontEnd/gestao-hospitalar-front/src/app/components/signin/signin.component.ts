import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestLogin } from 'src/app/core/models/login';
import { RegisterUser } from 'src/app/core/models/register';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public requestLogin!: RequestLogin;
  public requestRegister!: RegisterUser;


  constructor(private snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
    this.requestRegister = new RegisterUser();
  }
  
  register() {
    console.log(this.requestRegister);
  }

  login() {
    console.log(this.requestLogin);
  }

}
