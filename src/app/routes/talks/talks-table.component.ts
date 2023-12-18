import {Component, OnDestroy, OnInit} from "@angular/core";
import {AppService} from "../../app.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MediatorService} from "../../services/mediator.service";

@Component({
  selector: 'app-talks-table',
  templateUrl: './talks-table.component.html',
  styleUrls: ['./talks-table.component.scss']
})

export class TalksTableComponent implements OnInit, OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading = true;
  tableData;
  filteredtableData;
  snapshootFilteredData;
  columns = [
    {name: 'Event', key: 'event', width: null, sort: null},
    {name: 'Speakers', key: 'speakers', width: null, sort: null},
    {name: 'Date', key: 'date', width: '200px', sort: null},
    {name: 'Bookmarks', key: 'bookmarks', width: '200px', sort: true},
    {name: 'Rating', key: 'rating', width: '200px', sort: true}
  ];
  constructor(
    private appService: AppService,
    public mediator: MediatorService,
  ) {

  }

  ngOnInit() {
    this.appService.searchChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(search => {
        this.searchTableData(search);
      })
    this.getTableData();
  }
  getTableData() {
    this.loading = true;
    this.appService.getTalks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.tableData = data;
          this.filteredtableData = data['data'];
          this.snapshootFilteredData = JSON.parse(JSON.stringify(this.filteredtableData));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      })
  }

  changeOrder(event, key){
    this.loading = true;
    if(event === 'ascend') {
      this.filteredtableData.sort((a,b)=>a[key] - b[key]);
    }else if (event === 'descend') {
      this.filteredtableData.sort((a,b)=>b[key] - a[key]);
    }else {
      this.filteredtableData = JSON.parse(JSON.stringify(this.snapshootFilteredData));
    }
    this.loading = false;
  }
  searchTableData(search) {
    if(!search) {
      this.filteredtableData = this.tableData;
    }
    this.filteredtableData = this.tableData['data'].filter(item =>
      item['event'].toLowerCase().includes(search.toLowerCase())
      || item['speakers'].toLowerCase().includes(search.toLowerCase()));
      this.snapshootFilteredData = JSON.parse(JSON.stringify(this.filteredtableData));
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.appService.searchChanged$.next(null);
  }
}
