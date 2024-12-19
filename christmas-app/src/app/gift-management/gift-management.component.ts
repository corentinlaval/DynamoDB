import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-gift-management',
  standalone: true,
  templateUrl: './gift-management.component.html',
  styleUrls: ['./gift-management.component.css'],
  imports: [
    FormsModule,
    NgForOf
  ]
})
export class GiftManagementComponent {
  newChild = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    gifts: [] as string[],
  };

  newGift = ''; // Temporaire pour ajouter un cadeau

  addGift() {
    if (this.newGift.trim()) {
      this.newChild.gifts.push(this.newGift.trim());
      this.newGift = ''; // Réinitialise le champ après ajout
    }
  }

  removeGift(gift: string) {
    this.newChild.gifts = this.newChild.gifts.filter((g) => g !== gift);
  }

  addChild() {
    if (
      this.newChild.firstName &&
      this.newChild.lastName &&
      this.newChild.address &&
      this.newChild.city
    ) {
      console.log('Child added:', this.newChild);
      // Réinitialise les champs après soumission
      this.newChild = { firstName: '', lastName: '', address: '', city: '', gifts: [] };
    }
  }
}
