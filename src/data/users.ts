import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  "firstName": string;
  "lastName": string;
  "age": string;
  "email": string;
  "username": string;
};

@Injectable({
  providedIn: 'root',
})
export class Users {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = "https://dummyjson.com";

  public getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this._apiUrl}/users`);
  }
}
