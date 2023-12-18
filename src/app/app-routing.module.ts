import {NgModule} from '@angular/core';
import {RouterGuard} from "./guards/router.guard";
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./routes/home/home.component";
import {TableComponent} from "./routes/table/table.component";
import {LoginComponent} from "./routes/login/login.component";
import {QrCodeComponent} from "./routes/qr-code/qr-code.component";
import {AdminUserGuard} from "./guards/admin-user.guard";
import {UserFlowComponent} from "./routes/user-flow/user-flow.component";
import {FlowsComponent} from "./routes/flows/flows.component";
import {TalksTableComponent} from "./routes/talks/talks-table.component";
import {AttendeesTableComponent} from "./routes/attendees/attendees-table.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {
    path: '', component: HomeComponent,
    canActivate: [RouterGuard], children: [
      {path: 'talks', component: TalksTableComponent, canActivate: [AdminUserGuard]},
      {path: 'attendees', component: AttendeesTableComponent, canActivate: [AdminUserGuard]},
      {path: 'logs', component: FlowsComponent, canActivate: [AdminUserGuard]},
      {path: 'table', component: TableComponent, canActivate: [AdminUserGuard]},
      {path: 'qr-code', component: QrCodeComponent},
      {path: 'flow/:id', component: UserFlowComponent, canActivate: [AdminUserGuard]},
    ]
  },
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
