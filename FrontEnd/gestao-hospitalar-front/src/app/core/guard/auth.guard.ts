// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Router } from 'express';
// import { Observable } from 'rxjs';
// import { LoginService } from '../service/login.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private loginService: LoginService, private route: Router){}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//       if(this.loginService.isLoggedIn()) {
//         return true;
//       } else {
//         this.route.navigate(['signin']);
//         return false;
//       }
//   }
  
// }
