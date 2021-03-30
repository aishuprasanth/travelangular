import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //create constuctor

  constructor(private authService:AuthService,private router: Router)
  {

  }


  canActivate(
    route: ActivatedRouteSnapshot): boolean  {

      const expectedRole=route.data.role;
      const currentRole=localStorage.getItem("ACCESS_ROLE");

      if(currentRole!==expectedRole){
        this.router.navigateByUrl('/login');
        return false;
      }
    return true;
  }
  
}
