import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-santa-dashboard',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './santa-dashboard.component.html',
  styleUrls: ['./santa-dashboard.component.css'],
})
export class SantaDashboardComponent implements OnInit {
  childrenByCity: { [key: string]: any[] } = {};

  ngOnInit() {
    this.childrenByCity = {
      "North Pole": [
        { firstName: 'John', lastName: 'Doe', address: '123 Candy Lane' },
        { firstName: 'Jane', lastName: 'Smith', address: '456 Snowflake St' },
      ],
    };
  }

  protected readonly Object = Object;
}
