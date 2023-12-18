import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../app.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {MediatorService} from "../../services/mediator.service";

@Component({
  selector: 'app-user-flow',
  templateUrl: './user-flow.component.html',
  styleUrls: ['./user-flow.component.scss']
})
export class UserFlowComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  tableData;
  params = {page: 1, per_page: 50, search: null};
  loading = true;
  userId: string;

  constructor(private activatedRoute: ActivatedRoute,
              public mediator: MediatorService,
              private router: Router,
              private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.searchChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(search => {
        let s = search;
        if (search === '') {
          s = null;
        }
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {search: s},
          queryParamsHandling: 'merge'
        }).then()
      })
    this.activatedRoute.params
      .subscribe(params => {
        if (params && params.id) {
          this.userId = params.id;
        }
      })

    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length === 0) {
        this.setQueryParams(this.params);
      } else {
        for (let [key, value] of Object.entries(params)) {
          this.params[key] = value;
        }
        if (params.search) {
          this.params.search = params.search;
        }
        this.getTableData(this.userId);
      }
    })
  }

  getTableData(id) {
    this.loading = true;
    this.appService.goToUserFlow(id, this.params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: value => {
          this.tableData = value;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      })
  }

  ngOnDestroy() {
    this.appService.searchChanged$.next('');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onParamsChange(params) {
    const preparedParams = this.prepareParams(params, this.params);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: preparedParams,
    }).then();
  }

  prepareParams(nzParams, params) {
    const {filter, pageSize, pageIndex, sort} = nzParams;
    const data = {
      page: pageIndex ? +pageIndex : 0,
      per_page: pageSize ? +pageSize : 50,
    };
    // Need to append the sorted nzParams with the rest
    for (const [key, value] of Object.entries(data)) {
      params[key] = value;
    }
    return params;
  }

  setQueryParams(params) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
    }).then();
  }

}
