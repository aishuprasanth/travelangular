import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from './login';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router) { }

  //verify Login

  public loginVerify(login:Login){

//calling webservice and passing username and password
return this.httpClient.get<Login>(environment.apiUrl+'/api/user-login/'+login.username+"&"+login.password);
  }

  //Logoutmethod
  public logOut(){
    sessionStorage.removeItem('fname');
    localStorage.removeItem('fname');
    localStorage.removeItem('ACCESS_ROLE');
    //token based authentication-jwt

    
  }
}
