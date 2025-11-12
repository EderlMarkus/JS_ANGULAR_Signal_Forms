import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  "id": number;
  "firstName": string;
  "lastName": string;
  "maidenName": string;
  "age": number;
  "gender": string;
  "email": string;
  "phone": string;
  "username": string;
  "password": string;
  "birthDate": string;
  "image": string;
  "bloodGroup": string;
  "height": number;
  "weight": number;
  "eyeColor": string;
  "hair": {
    "color": string;
    "type": string
  },
  "ip": string;
  "address": {
    "address": string;
    "city": string;
    "state": string;
    "stateCode": string;
    "postalCode": string;
    "coordinates": {
      "lat": number;
      "lng": number;
    },
    "country": string
  },
  "macAddress": string;
  "university": string;
  "bank": {
    "cardExpire": string;
    "cardNumber": string;
    "cardType": string;
    "currency": string;
    "iban": string
  },
  "company": {
    "department": string;
    "name": string;
    "title": string;
    "address": {
      "address": string;
      "city": string;
      "state": string;
      "stateCode": string;
      "postalCode": string;
      "coordinates": {
        "lat": number;
        "lng": number;
      },
      "country": string
    }
  },
  "ein": string;
  "ssn": string;
  "userAgent": string;
  "crypto": {
    "coin": string;
    "wallet": string;
    "network": string
  },
  "role": string
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

  public findUserByKeyValue(key: string, value: string) {
    const params = new HttpParams()
      .set("key", key)
      .set("value", value);

    return this._httpClient.get<User[]>(`${this._apiUrl}/filter`, { params })
  }
}
