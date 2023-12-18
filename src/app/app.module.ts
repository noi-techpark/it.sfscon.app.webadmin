import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from "./routes/login/login.component";
import {TableComponent} from "./routes/table/table.component";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {HeaderComponent} from './components/header/header.component';
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {QRCodeModule} from "angularx-qrcode";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzGridModule} from 'ng-zorro-antd/grid';
import { QrCodeComponent } from './routes/qr-code/qr-code.component';
import { HomeComponent } from './routes/home/home.component';
import {RouterModule} from "@angular/router";
import { UserFlowComponent } from './routes/user-flow/user-flow.component';
import { FlowsComponent } from './routes/flows/flows.component';
import {TalksTableComponent} from "./routes/talks/talks-table.component";
import {AttendeesTableComponent} from "./routes/attendees/attendees-table.component";
import {TableHeaderComponent} from "./components/table-header/table-header.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TableComponent,
    HeaderComponent,
    QrCodeComponent,
    HomeComponent,
    UserFlowComponent,
    FlowsComponent,
    TalksTableComponent,
    AttendeesTableComponent,
    TableHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzGridModule,
    NzDividerModule,
    NzMessageModule,
    NzAvatarModule,
    QRCodeModule,
    NzDropDownModule,
    NzIconModule,
    NzToolTipModule,
    NzModalModule,
    RouterModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
