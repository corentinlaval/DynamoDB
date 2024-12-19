import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gift-management',
  standalone: true,
  imports: [FormsModule], // Modules nécessaires pour ce composant
  templateUrl: './gift-management.component.html',
  styleUrls: ['./gift-management.component.css'],
})
export class GiftManagementComponent {
  newChild = { firstName: '', lastName: '', address: '', city: '' };
  children = [];

  addChild() {
    if (this.newChild.firstName && this.newChild.lastName && this.newChild.address && this.newChild.city) {
      // @ts-ignore
      this.children.push({ ...this.newChild });
      this.newChild = { firstName: '', lastName: '', address: '', city: '' };
    }
  }
}
