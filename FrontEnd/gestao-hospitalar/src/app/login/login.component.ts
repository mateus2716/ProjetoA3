import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  
  form: FormGroup = new FormGroup({
    username: new FormControl('',  [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {}

  public submit() {}

}