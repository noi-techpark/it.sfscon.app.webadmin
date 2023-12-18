import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AppService} from "../../app.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export  class TableHeaderComponent implements OnInit{
  downloadUrl = "/api/conferences/sfscon/pathname.csv"
  @Input() title;
  constructor(
    private appService: AppService
  ) {
  }
  ngOnInit() {
    const path = window.location.pathname;
    this.downloadUrl = this.downloadUrl.replace('/pathname', path);
  }
}
