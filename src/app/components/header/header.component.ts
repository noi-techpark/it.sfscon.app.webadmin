import {fromEvent, Subject} from "rxjs";
import {AppService} from "../../app.service";
import {ActivatedRoute,Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {MediatorService} from "../../services/mediator.service";
import {LoggedUserService} from "../../services/logged-user.service";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

export interface DashboardModel {
  name: string;
  value: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  dashboardData: DashboardModel[];
  disabledBtn = false;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private loggedUser: LoggedUserService,
              private toastr: NzMessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public appService: AppService,
              public mediator: MediatorService) {
  }

  ngOnInit(): void {
    this.appService.getDashboard().pipe(takeUntil(this.destroy$)).subscribe((res: DashboardModel[])=>{
      this.dashboardData = res;
    })
  }

  ngAfterViewInit() {
    this.appService.searchChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe((search: string) => {
        this.searchInput.nativeElement.value = search;
      })
    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((res: any) => {
          this.appService.searchChanged$.next(res.target.value);
        })
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.search) {
        this.searchInput.nativeElement.value = params.search;
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout() {
    this.loggedUser.logoutUser();
  }

  onSyncData() {
    this.disabledBtn = true;
    this.appService.getSyncData().subscribe({
      next: value => {
        this.disabledBtn = false;
        if (value && value.updated) {
          this.toastr.success('Updated');
        } else {
          this.toastr.success('No update needed');
        }
      },
      error: () => {
        this.disabledBtn = false;
        this.toastr.error('Error occured');
      }
    })
  }
}
