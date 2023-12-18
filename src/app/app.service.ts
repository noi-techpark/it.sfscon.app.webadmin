import {Subject} from "rxjs";
import {Injectable} from '@angular/core';
import {ApiService} from "./services/api.service";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  searchChanged$ = new Subject<string>();
  routes = [
    {name: "Talks", route: "talks"},
    {name: "Attendees", route: "attendees"},
//    {name: "Logs", route: "logs"},
  ]

  constructor(private api: ApiService) {
  }

  getTableData(data = {}) {
    return this.api.svc_get('/api/v3/conferences/users', data);
  }

  getSyncData() {
    return this.api.svc_post('/api/v3/conferences/import-xml', {});
  }

  goToUserFlow(id, data = {}) {
    return this.api.svc_get(`/api/v3/flows/sfscon2022/users/${id}`, data);
  }

  getFlows(data = {}) {
    return this.api.svc_get(`/api/v3/flows/sfscon2022`, data);
  }
  getDashboard(){
    return this.api.svc_get(`/api/conferences/sfscon-2023/dashboard`, {})
  }
  getTalks(){
    return this.api.svc_get(`/api/conferences/sfscon-2023/sessions`, {})
  }
  getAttendess(data = {}) {
    return this.api.svc_get(`/api/conferences/sfscon-2023/attendees`, data)
  }
}


