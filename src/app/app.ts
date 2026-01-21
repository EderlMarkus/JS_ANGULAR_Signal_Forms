import { Component, inject, signal } from '@angular/core';
import { FormField, form, maxLength, minLength, provideSignalFormsConfig, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User, Users } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [FormField, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private userService = inject(Users);

  protected readonly userSig = signal<User>({
    "firstName": "",
    "lastName": "",
    "age": 0,
    "email": "",
    "username": "",
  });



  protected readonly userForm = form(this.userSig, (path) => {
    required(path.firstName, { message: "Firstname is required." }),
      minLength(path.firstName, 3, { message: "Firstname must have at least 3 Characters." }),
      maxLength(path.firstName, 30, { message: "Firstname must not have more than 30 Characters." })
  });

  protected saveProposal() {
    console.log("saved");
  }

  //TODO: focusBoundControl()
  //https://blog.ninja-squad.com/2026/01/15/what-is-new-angular-21.1
}
