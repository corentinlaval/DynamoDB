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
  childrenByCity: { [key: string]: { firstName: string; lastName: string; address: string; gifts: string[] }[] } = {};

  ngOnInit() {
    this.childrenByCity = {
      "North Pole": [
        {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Candy Lane',
          gifts: ['Toy Car', 'Lego Set'],
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          address: '456 Snowflake St',
          gifts: ['Doll', 'Puzzle'],
        },
      ],
      "South Pole": [
        {
          firstName: 'Anna',
          lastName: 'Brown',
          address: '789 Iceberg Ave',
          gifts: ['Board Game', 'Stuffed Animal'],
        },
      ],
    };
  }

  protected readonly Object = Object;
}
