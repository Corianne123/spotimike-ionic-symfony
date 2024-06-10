import { LoginPage } from 'src/app/pages/login/login.page';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequestError, LoginRequestSuccess } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private http = inject(HttpClient);
  private apiUrl = environment.url_api;
  

  constructor() {}


  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.apiUrl}/login`, body.toString(),{headers});
  }

  register(email: string, password: string , phoneNumber: string , firstName: string , lastName: string,birthDate : Date): Observable<any> {

    const formattedDate = birthDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    body.set('tel', phoneNumber);
    body.set('firstname', firstName);
    body.set('lastname', lastName);
    body.set('dateBirth', formattedDate);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.apiUrl}/register`, body.toString(),{headers});
  }
}
