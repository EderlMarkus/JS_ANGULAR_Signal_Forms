import { Component, signal } from '@angular/core';
import { Control, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../data/users';

@Component({
  selector: 'app-root',
  imports: [Control, MatInputModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly userSig = signal<User>({
    "id": 0,
    "firstName": "",
    "lastName": "",
    "maidenName": "",
    "age": 0,
    "gender": "",
    "email": "",
    "phone": "",
    "username": "",
    "password": "",
    "birthDate": "",
    "image": "",
    "bloodGroup": "",
    "height": 0,
    "weight": 0,
    "eyeColor": "",
    "hair": {
      "color": "",
      "type": ""
    },
    "ip": "",
    "address": {
      "address": "",
      "city": "",
      "state": "",
      "stateCode": "",
      "postalCode": "",
      "coordinates": {
        "lat": 0,
        "lng": 0,
      },
      "country": ""
    },
    "macAddress": "",
    "university": "",
    "bank": {
      "cardExpire": "",
      "cardNumber": "",
      "cardType": "",
      "currency": "",
      "iban": ""
    },
    "company": {
      "department": "",
      "name": "",
      "title": "",
      "address": {
        "address": "",
        "city": "",
        "state": "",
        "stateCode": "",
        "postalCode": "",
        "coordinates": {
          "lat": 0,
          "lng": 0,
        },
        "country": ""
      }
    },
    "ein": "",
    "ssn": "",
    "userAgent": "",
    "crypto": {
      "coin": "",
      "wallet": "",
      "network": ""
    },
    "role": ""
  });

  protected readonly userForm = form(this.userSig, (path) => {
    required(path.firstName);
  });

  protected saveProposal() {
    console.log("saved");
  }
}
