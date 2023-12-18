import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {MediatorService} from "./mediator.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  private _token: string;
  private _token_name = 'portal_token';

  constructor(private http: HttpClient,
              private router: Router,
              private api: ApiService,
              private mediator: MediatorService
  ) {
    this._token = localStorage.getItem(this._token_name);
  }

  checkUser() {
    return this.api.svc_get('/api/tenants/me', {});
  }

  loginUser(data) {
    return this.api.svc_post(`/api/tenants/sessions`, data);
  }

  logoutUser() {
    this.mediator.loggedUser = false;
    localStorage.removeItem('jwtAccessor');
    this.router.navigate(['/login']);
  }

  getTenant() {
    return this.api.svc_get('/api/v3/tenants/code/OPENCON', {});
  }
}
