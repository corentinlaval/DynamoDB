import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GiftManagementComponent} from './gift-management/gift-management.component';
import {SantaDashboardComponent} from './santa-dashboard/santa-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [GiftManagementComponent, SantaDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'christmas-app';
}
