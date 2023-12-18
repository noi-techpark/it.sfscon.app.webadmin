import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AppService} from "../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediatorService} from "../../services/mediator.service";

interface TableData {
  items: any [];
  summary: any;
  columns: any [];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  tableData: TableData;
  params = {page: 1, per_page: 50, search: null};
  isVisible = false;
  currentId: string;
  currentUser: string;
  loading = false;
  actionsDropdownOpened = false;

  constructor(private appService: AppService,
              private router: Router,
              public mediator: MediatorService,
              private activatedRoute: ActivatedRoute) {
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
        this.getTableData();
      }
    })
  }

  ngOnDestroy() {
    this.appService.searchChanged$.next('');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getTableData() {
    this.loading = true;
    this.appService.getTableData(this.params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.tableData = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      })
  }

  setQueryParams(params) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
    }).then();
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

  showModal(id, name): void {
    this.isVisible = true;
    this.currentId = id;
    this.currentUser = name;
  }

  handleOk(): void {
    this.resetValues();
  }

  handleCancel(): void {
    this.resetValues();
  }

  resetValues() {
    this.isVisible = false;
    this.currentId = null;
    this.currentUser = null;
  }

  goToFlow(id) {
    if (!this.actionsDropdownOpened) {
      this.router.navigateByUrl(`flow/${id}`);
    }
  }
}
