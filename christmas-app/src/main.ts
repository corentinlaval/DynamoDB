import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import {GiftManagementComponent} from './app/gift-management/gift-management.component';
import {SantaDashboardComponent} from './app/santa-dashboard/santa-dashboard.component';

const routes: Routes = [
  { path: 'child', component: GiftManagementComponent },
  { path: 'santa', component: SantaDashboardComponent },
  { path: '', redirectTo: '/child', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
