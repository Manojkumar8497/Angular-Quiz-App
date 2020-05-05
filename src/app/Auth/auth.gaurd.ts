import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class AuthGaurd implements CanActivate {
    constructor(private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!localStorage.getItem('userData')) {
            this.router.navigate(['/register']);
            return false;
        }
        return true;
    }
}