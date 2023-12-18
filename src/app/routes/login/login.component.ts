import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {switchMap, takeUntil} from "rxjs/operators";
import {ApiService} from "../../services/api.service";
import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoggedUserService} from "../../services/logged-user.service";
import {MediatorService} from "../../services/mediator.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('inputEl') inputEl: ElementRef;

  username: string;
  password: string;
  disabledBtn = false;

  @HostListener('document:keydown.enter') onEnterPress() {
    if (this.username && this.password) {
      this.onLogin();
    }
  }

  constructor(private loggedUser: LoggedUserService,
              private api: ApiService,
              private mediator: MediatorService,
              private router: Router) {
  }

  ngOnInit(): void {
    localStorage.removeItem('jwtAccessor');
    this.api.sessionExpire$.subscribe(res => {
      if (res) {
        this.disabledBtn = false;
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    this.inputEl.nativeElement.focus();
  }

  onLogin() {
    this.disabledBtn = true;
    this.loggedUser.loginUser({
      username: this.username.replace(/ /g,''),
      password: this.password
    })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: value => {
          if (value.token) {
            localStorage.setItem('jwtAccessor', value.token);
          }
          return this.router.navigateByUrl('');
        },
        error: () => {
          this.disabledBtn = false;
        }
      })
  }

}
