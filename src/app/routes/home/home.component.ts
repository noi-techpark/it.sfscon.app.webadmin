import {Component, OnInit} from '@angular/core';
import {LoggedUserService} from "../../services/logged-user.service";
import {MediatorService} from "../../services/mediator.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loggedUser: LoggedUserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private mediator: MediatorService) {
  }

  ngOnInit(): void {
    if (this.mediator.userInfo && this.mediator.userInfo['role_code'] === 'ADMIN') {
      // Removes two calls made to getTableData since 'table' route will trigger that 2 calls when we reload the page
      if (this.router.url === '/' || this.router.url.includes('qr-code')) {
        this.router.navigateByUrl('talks');
      } else {
        this.router.navigateByUrl(this.router.url);
      }
    } else {
      this.router.navigateByUrl('qr-code');
    }
  }
}
