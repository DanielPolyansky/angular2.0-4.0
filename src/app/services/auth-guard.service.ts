import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){

    }
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.authService.isLogged()!=true){
            this.router.navigateByUrl('/home');
            console.log('You are not authenticated!');
        }
        return this.authService.isLogged();
    }
}