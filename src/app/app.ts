import { Component, signal } from '@angular/core';
import { email, Field, form, max, maxLength, min, minLength, pattern, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [Field, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly userSig = signal<User>({
    "firstName": "122221231222212312222123122221122221231222212312222123122221122221231222212312222123122221",
    "lastName": "",
    "age": 0,
    "email": "",
    "username": "",
  });

  protected readonly userForm = form(this.userSig, (path) => {
    required(path.firstName, { message: "Firstname is required." });
    minLength(path.firstName, 3, { message: "Firstname must have at least 3 Characters." });
    maxLength(path.firstName, 30, { message: "Firstname must not have more than 30 Characters." })
    // min(path.firstName, minValue);               // minimum numeric value
    // max(path.firstName, maxValue);               // maximum numeric value  
    // pattern(path.firstName, regex);              // regex pattern
    // email(path.firstName);                       // email format
  });

  protected saveProposal() {
    console.log("saved");
  }
}
