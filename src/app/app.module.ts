
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardEmpComponent } from './dashboard/dashboard-components/dashboard-emp/dashboard-emp.component';
import { EmpDialogComponent } from './dashboard/dashboard-components/dashboard-emp/emp-dialog/emp-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardsRoutes } from './dashboard/dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CollaboratorDialogContent } from './collaborator/collaborator.component';

//import { MatDialog } from '@angular/material/dialog';

import {
  TopCardComponent,
  SalesOverviewComponent,
  VisitorComponent,
  Visitor2Component,
  PostsComponent,
  NewsletterComponent,
  DeveloperInfoComponent,
  ActivityComponent,
  TopCard2Component,
  SalesPurchaseComponent,
  SalesYearlyComponent,
  ContactListComponent,
  CommentsComponent,
  MessageComponent
  
} from './dashboard/dashboard-components';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProjectComponent } from './project/project.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';

import { AddComponent } from './collaborator/add/add.component';
import { TasklistComponent } from './dashboard/dashboard-components/tasklist/tasklist.component';
import { TaskDialogContent } from './dashboard/dashboard-components/tasklist/tasklist.component';
import { EmprankingComponent } from './leaderboard/leaderboard-component/empranking/empranking.component';
import { CdkTableModule } from '@angular/cdk/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PTodoService } from './project/ptodo.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,
    AppBreadcrumbComponent,
    TaskboardComponent,
    DashboardComponent,
    TopCardComponent,
    SalesOverviewComponent,
    VisitorComponent,
    Visitor2Component,
    PostsComponent,
    NewsletterComponent,
    DeveloperInfoComponent,
    ActivityComponent,
    TopCard2Component,
    SalesPurchaseComponent,
    SalesYearlyComponent,
    ContactListComponent,
    CommentsComponent,
    MessageComponent,
    DashboardEmpComponent,
    EmpDialogComponent,
    LeaderboardComponent,
    ProjectComponent,
    CollaboratorComponent,
    AddComponent,
    CollaboratorDialogContent,
    TasklistComponent,
    TaskDialogContent,
    EmprankingComponent
  ],
  entryComponents: [
    TaskDialogContent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    DragDropModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    MatCardModule,
    MatIconModule,
    ChartistModule,
    ChartsModule,
    NgApexchartsModule,
    CommonModule,
    CdkTableModule,
    NgxChartsModule,
    ReactiveFormsModule,
    
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    AuthGuard,
    DatePipe,
    PTodoService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
