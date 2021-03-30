import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../shared/login';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser: Login = new Login;
  fname?: string;
  // loginUser: User;
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {

    //create reactive form

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]

    });
  }

  //get control for validation
  get formControls() {
    return this.loginForm.controls;
  }

  //login verify
  loginCredential() {

    this.isSubmitted = true;


    //form invalid
    if (this.loginForm.invalid)
      return;


    //form isvalid
    if (this.loginForm.valid) {
      //calling methode from web service

      this.authService.loginVerify(this.loginForm.value)
      .subscribe(data=>{
        console.log(data);

        //checking role based authentication

        if(data.roleId===1){
        
          this.router.navigateByUrl('/admin')
        }else if(data.roleId===2){
          

          this.router.navigateByUrl('/manager')
        }else{
          this.error="Sorry this role is not allowed"
        }
      },
      error=>{
        this.error="Invalid username and password"
      });
    }

  }
}
