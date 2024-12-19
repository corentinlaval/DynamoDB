import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gift-management',
  templateUrl: './gift-management.component.html',
  styleUrls: ['./gift-management.component.css'],
  imports: [
    NgForOf,
    FormsModule
  ]
})
export class GiftManagementComponent {
  // Propriétés pour gérer les enfants
  newChild: { firstName: string; lastName: string; address: string; city: string } = {
    firstName: '',
    lastName: '',
    address: '',
    city: ''
  };

  children: { firstName: string; lastName: string; address: string; city: string }[] = [];

  // Méthode pour ajouter un enfant à la liste
  addChild() {
    if (this.newChild.firstName && this.newChild.lastName && this.newChild.address && this.newChild.city) {
      this.children.push({ ...this.newChild });
      this.newChild = { firstName: '', lastName: '', address: '', city: '' }; // Réinitialisation du formulaire
    }
  }
}
