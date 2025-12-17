import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  "firstName": string;
  "lastName": string;
  "age": number;
  "email": string;
  "username": string;
};

export interface UserResponse {
  limit: number,
  skip: number
  total: number
  users: User[]
}

@Injectable({
  providedIn: 'root',
})
export class Users {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = "https://dummyjson.com";

  public getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this._apiUrl}/users`);
  }

  public findUserByKeyValue(key: string, value: string) {
    const params = new HttpParams()
      .set("key", key)
      .set("value", value);

    return this._httpClient.get<UserResponse>(`${this._apiUrl}/filter`, { params })
  }
}
