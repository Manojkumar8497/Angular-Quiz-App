import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotAuthGaurd implements CanActivate {
    constructor(public router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('userData')) {
            this.router.navigate(['/quiz']);
            return false;
        }
        return true;
    }
}