import { Component, OnInit } from '@angular/core';
import { ChildDataService } from '../services/child-data.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-santa-dashboard',
  templateUrl: './santa-dashboard.component.html',
  styleUrls: ['./santa-dashboard.component.css'],
  imports: [
    NgForOf
  ]
})
export class SantaDashboardComponent implements OnInit {
  childrenByCity: { [city: string]: any[] } = {};

  constructor(private childDataService: ChildDataService) {}

  ngOnInit() {
    this.childDataService.getChildren().subscribe({
      next: (data: any[]) => {
        this.groupByCity(data);
      },
      error: (err: any) => {
        console.error('Error fetching children:', err);
      },
    });
  }

  groupByCity(data: any[]) {
    this.childrenByCity = data.reduce((acc, child) => {
      const city = child.city || 'Unknown';
      if (!acc[city]) acc[city] = [];
      acc[city].push(child);
      return acc;
    }, {});
  }

  protected readonly Object = Object;
}
