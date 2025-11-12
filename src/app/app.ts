import { Component, signal } from '@angular/core';
import { Control, disabled, FieldPath, form, maxLength, minLength, required, validateHttp } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [Control, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly userSig = signal<User>({
    "firstName": "Markus",
    "lastName": "",
    "age": 0,
    "email": "",
    "username": "",
  });


  private readonly asyncValidator = (schema: FieldPath<string>) => {
    validateHttp(schema, {
      request: (ctx) => ({
        url: "https://dummyjson.com/users/filter",
        params: {
          key: "firstName",
          value: ctx.value()
        }
      }),
      errors: (result: { users: User[] }, _ctx) => {
        if (result.users?.length > 0) {
          return {
            kind: "user_already_exists",
            message: "Username already taken."
          }
        };
        return null;
      }
    })
  }

  protected readonly userForm = form(this.userSig, (path) => {
    required(path.firstName, { message: "Firstname is required." }),
      minLength(path.firstName, 3, { message: "Firstname must have at least 3 Characters." }),
      maxLength(path.firstName, 30, { message: "Firstname must not have more than 30 Characters." }),
      this.asyncValidator(path.firstName)
  });



  protected saveProposal() {
    console.log("saved");
  }
}
