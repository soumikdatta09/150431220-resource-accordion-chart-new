import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (next.url[0].path === 'login') {
            if (window.sessionStorage.getItem('currentUser')) {
                console.log('you already logged in');
                this.router.navigate(['home']);
                return false;
            } else {
                return true;
            }
        }

        if (window.sessionStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
