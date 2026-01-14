import { Component, inject, resource, signal } from '@angular/core';
import { FormField, form, maxLength, minLength, required, SchemaPath, validateAsync, validateHttp } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User, Users } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [FormField, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private userService = inject(Users);
  protected readonly userSig = signal<User>({
    "firstName": "Markus",
    "lastName": "",
    "age": 0,
    "email": "",
    "username": "",
  });


  private readonly _asyncValidator = (schema: SchemaPath<string>) => {
    validateAsync(schema, {
      params: ({ value }) => {
        const val = value();
        if (!val || val.length < 3) return undefined;
        return val;
      },
      factory: firstname => resource({
        params: firstname,
        loader: async ({ params: firstname }) => {
          const queriedUsers = await firstValueFrom(this.userService.findUserByKeyValue("firstName", firstname));
          return queriedUsers.users.length === 0
        }
      }),
      onSuccess: (result: boolean) => {
        if (!result) {
          return {
            kind: "firstname_taken",
            message: "Name already taken"
          }
        }
        return null;
      },
      onError: (error: unknown) => {
        console.error('Validation error:', error);
        return null;
      }
    });
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
