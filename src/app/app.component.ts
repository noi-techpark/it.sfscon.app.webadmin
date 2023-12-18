import {Component} from '@angular/core';
import {ApiService} from "./services/api.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {LoggedUserService} from "./services/logged-user.service";
import {MediatorService} from "./services/mediator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  destroy$: Subject<boolean> = new Subject();

  constructor(private api: ApiService,
              private loggedUser: LoggedUserService,
              public mediator: MediatorService) {
    this.loggedUser.getTenant()
      .subscribe(res => {
        this.mediator.tenant = res.id;
      })
    this.api.sessionExpire$.pipe(takeUntil(this.destroy$)).subscribe(hasExpired => {
      if (hasExpired) {
        this.loggedUser.logoutUser();
      }
    });
  }
}
