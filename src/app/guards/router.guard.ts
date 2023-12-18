import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MediatorService} from "../services/mediator.service";
import {LoggedUserService} from "../services/logged-user.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  constructor(private api: ApiService,
              private mediator: MediatorService,
              private loggedUser: LoggedUserService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>((resolve) => {
      if (localStorage.getItem('jwtAccessor')) {
        this.loggedUser.checkUser()
          .subscribe({
            next: user => {
              this.mediator.userInfo = user;
              this.mediator.loggedUser = true;
              resolve(true);
            },
            error: () => {
              this.mediator.loggedUser = false;
              this.router.navigateByUrl('login');
              resolve(false);
            }
          });
      } else {
        this.router.navigateByUrl('login');
        resolve(false);
      }
    });
  }

}
