import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {
  tenant: string;
  loggedUser: boolean;
  tableHeight: number;
  userInfo: any [];

  constructor() {
    this.tableHeight = window.innerHeight - 363;
  }
}
