import { Routes } from '@angular/router';
import { GiftManagementComponent } from './gift-management/gift-management.component';
import { SantaDashboardComponent } from './santa-dashboard/santa-dashboard.component';

export const routes: Routes = [
  { path: 'child', component: GiftManagementComponent }, // Route pour la page des enfants
  { path: 'santa', component: SantaDashboardComponent }, // Route pour le tableau de bord du Père Noël
  { path: '', redirectTo: '/child', pathMatch: 'full' }, // Redirection par défaut vers /child
];
