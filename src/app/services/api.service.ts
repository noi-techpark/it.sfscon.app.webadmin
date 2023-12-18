import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, of as observableOf, Subject, throwError} from 'rxjs';
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({providedIn: 'root'})
export class ApiService {
  sessionExpire$: Subject<boolean> = new Subject();


  constructor(
    private router: Router,
    private toastr: NzMessageService,
    private http: HttpClient,
  ) {
  }

  getToken() {
    return localStorage.getItem('jwtAccessor');
  }

  get_api_url(_url) {
    return `${_url}`;
  }

  svc_get(_url, data, token = null): Observable<any> {
    return this._svc_call('GET', _url, data, token);
  }

  svc_put(_url, data, token = null): Observable<any> {
    return this._svc_call('PUT', _url, data, token);
  }

  svc_post(_url, data, token = null): Observable<any> {
    return this._svc_call('POST', _url, data, token);
  }

  svc_patch(_url, data, token = null): Observable<any> {
    return this._svc_call('PATCH', _url, data, token);
  }

  svc_delete(_url, data, token = null): Observable<any> {
    return this._svc_call('DELETE', _url, data, token);
  }

  _svc_call(_method, _url, _data, _token = null): Observable<any> {
    const _options: any = {};

    if (_data) {
      if (_method === 'GET' || _method === 'DELETE') {
        _options['params'] = _data;
      }
    }

    const jwt = this.getToken();               // used for API calls to /tcapi endpoints
    const authToken = this.getToken();         // used for API calls to "v3" endpoints
    let headers;
    if (authToken || jwt) {
      headers = {
        jwt: jwt,
        Authorization: authToken
      };
    }

    if (_token) {                                           // used for API calls to telmekomclient
      if (!headers) {
        headers = {Authorization: _token};
      } else {
        headers.Authorization = _token;
      }
    }

    if (headers) {
      _options['headers'] = new HttpHeaders({...headers});
    }
    if (_method === 'GET') {
      return this.http.get(this.get_api_url(_url), _options)
        .pipe(catchError(err => this.handleError(err)));
    }

    if (_method === 'PUT') {
      return this.http.put(this.get_api_url(_url), _data, _options)
        .pipe(catchError(err => this.handleError(err)));
    }

    if (_method === 'POST') {
      return this.http.post(this.get_api_url(_url), _data, _options)
        .pipe(catchError(err => this.handleError(err)));
    }

    if (_method === 'PATCH') {
      return this.http.patch(this.get_api_url(_url), _data, _options)
        .pipe(catchError(err => this.handleError(err)));
    }

    if (_method === 'DELETE') {
      return this.http.delete(this.get_api_url(_url), _options)
        .pipe(catchError(err => this.handleError(err)));
    }
    return observableOf(false);
  }


  handleError(err) {
    this.toastr.error('Error occured');
    if (err?.status === 401 && err?.statusText === 'Unauthorized') {
      this.sessionExpire$.next(true);
      return of();
    } else {
      return throwError(err);
    }
  }
}
