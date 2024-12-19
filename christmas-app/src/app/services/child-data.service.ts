import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChildDataService {
  private apiUrl = 'http://your-api-url/api/children'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer des données via POST
  addChild(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Méthode pour récupérer des données via GET
  getChildren(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
