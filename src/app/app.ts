import { Component, signal } from '@angular/core';
import { FormField, form, maxLength, minLength, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [FormField, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly userSig = signal<User>({
    "firstName": "Markus",
  });

  protected readonly userForm = form(this.userSig, (path) => {
    //Es gibt mehrere vordefinierte Validatoren
    required(path.firstName, { message: "Firstname is required." });
    minLength(path.firstName, 3, { message: "Firstname must have at least 3 Characters." });
    maxLength(path.firstName, 30, { message: "Firstname must not have more than 30 Characters." })
    // min(path.firstName, minValue);                           // minimum numeric value
    // max(path.firstName, maxValue);                           // maximum numeric value  
    // pattern(path.firstName, regex);                          // regex pattern
    //email(path.firstName, { message: "Must be E-Mail." });   // email format
  });

  protected saveProposal() {
    console.log("saved");
  }
}
