import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { inject } from 'vue';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private http = inject(HttpClient);
  private route = environment.url_api;
  constructor() { }
}
