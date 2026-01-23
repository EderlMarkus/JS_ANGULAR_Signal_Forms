import { Component, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
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
    "lastName": "Ederl",
    "age": "0",
    "email": "markus.eder@r-software.at",
    "username": "MarkusEderl",
  });

  protected readonly userForm = form(this.userSig, (path) => {
    //OPTION 1
    required(path.firstName, {
      when: (ctx) => !!ctx.valueOf(path.lastName),
      message: "Firstname is required if Lastname was defined"
    });

    required(path.lastName, {
      when: (ctx) => !!ctx.valueOf(path.firstName),
      message: "Lastname is required if Firstname is defined"
    })
  });

  protected saveProposal() {
    console.log("saved");
  }
}
