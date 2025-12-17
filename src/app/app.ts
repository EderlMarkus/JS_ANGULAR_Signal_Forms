import { Component, signal } from '@angular/core';
import { customError, Field, form, maxLength, minLength, required, SchemaPath, validateHttp } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User, UserResponse } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [Field, MatInputModule, MatButtonModule, MatFormFieldModule],
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


  private readonly _asyncValidator = (schema: SchemaPath<string>) => {
    validateHttp(schema, {
      request: (ctx) => ({
        url: "https://dummyjson.com/users/filter",
        params: {
          key: "firstName",
          value: ctx.value() as string
        }
      }),
      onSuccess: (result: UserResponse, _ctx) => {
        if (result.users.length > 0) {
          return customError({
            kind: "firstname_taken",
            message: "Name already taken"
          });
        }
        return null;
      },
      onError: (error, _ctx) => {
        console.error('api error validating user', error);
        return {
          kind: 'api-failed'
        };
      }
    })
  }

  protected readonly userForm = form(this.userSig, (path) => {
    required(path.firstName, { message: "Firstname is required." });
    minLength(path.firstName, 3, { message: "Firstname must have at least 3 Characters." });
    maxLength(path.firstName, 30, { message: "Firstname must not have more than 30 Characters." });
    this._asyncValidator(path.firstName)
  });

  protected saveProposal() {
    console.log("saved");
  }
}
