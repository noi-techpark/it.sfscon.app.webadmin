import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MediatorService} from "../services/mediator.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminUserGuard implements CanActivate {
  constructor(private mediator: MediatorService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<any>((resolve) => {
      if (this.mediator.userInfo && this.mediator.userInfo['role_code'] === 'ADMIN') {
        resolve(true);
      } else {
        resolve(this.router.navigateByUrl('qr-code'));
      }
    });
  }

}
