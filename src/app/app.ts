import { Component, signal } from '@angular/core';
import { FormField, form, validateTree } from '@angular/forms/signals';
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
    //OPTION 4
    validateTree(path, (ctx) => {
      const firstName = ctx.fieldTree.firstName().value();
      const lastName = ctx.fieldTree.lastName().value();

      if (!firstName || !lastName) return null;

      if (firstName === lastName) {
        return {
          kind: "same_names",
          message: "Firstname and Lastname must not be same.",
          fieldTree: ctx.fieldTree.firstName
        }
      }
      return null;
    })
  });

  protected saveProposal() {
    console.log("saved");
  }
}
