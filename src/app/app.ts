import { Component, inject, signal } from '@angular/core';
import { apply, applyWhen, applyWhenValue, customError, email, Field, form, MAX_LENGTH, maxLength, MIN_LENGTH, minLength, required, schema, Schema, SchemaPath, submit, validateTree } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User, Users } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Field, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private userService = inject(Users);

  private readonly _textSchema: Schema<string> = schema((fieldPath) => {
    minLength(fieldPath, 3, { message: (ctx) => `Enter minimum ${ctx.field().minLength?.()} Characters` });
    maxLength(fieldPath, 50, { message: (ctx) => `Enter maximum ${ctx.field().maxLength?.()} Characters` });
  });

  private readonly _requiredSchema: Schema<string> = schema((fieldPath) => {
    required(fieldPath, { message: (ctx) => `${ctx.field().keyInParent()} is required.` });
  })

  private readonly _validateFirstNameLastNameSame = (schema: SchemaPath<User>) => {
    validateTree(schema, (ctx) => {
      const firstName = ctx.field.firstName().value();
      const lastName = ctx.field.lastName().value();
      if (!firstName || !lastName) return null;
      if (firstName === lastName) {
        return {
          kind: "same_names",
          message: "Firstname and Lastname must not be same",
          field: ctx.field.firstName,
          firstName,
          lastName
        }
      }
      return null;
    })
  }

  protected readonly userSig = signal<User>({
    "firstName": "Markus",
    "lastName": "Ederl",
    "age": "0",
    "email": "markus.ederl@r-software.at",
    "username": "MarkusEderl",
  });

  protected readonly userForm = form(this.userSig, (path) => {
    apply(path.firstName, this._textSchema);
    apply(path.lastName, this._textSchema);

    email(path.email, { message: "Must be E-Mail" });

    //OPTION 1
    required(path.firstName, {
      when: (ctx) => !!ctx.valueOf(path.lastName),
      message: "Firstname is required if Lastname was defined"
    });

    required(path.lastName, {
      when: (ctx) => !!ctx.valueOf(path.firstName),
      message: "Lastname is required if Firstname is defined"
    })

    //OPTION 2
    // applyWhenValue(path, (ctx) => !!ctx.firstName, (path) => {
    //   required(path.lastName, { message: "Lastname is required." });
    // });

    // applyWhenValue(path, (ctx) => !!ctx.lastName, (path) => {
    //   required(path.firstName, { message: "Firstname is required." });
    // });

    //OPTION 3
    // applyWhen(path, (ctx) => !!ctx.valueOf(path.firstName), (path) => apply(path.lastName, this._requiredSchema));
    // applyWhen(path, (ctx) => !!ctx.valueOf(path.lastName), (path) => apply(path.firstName, this._requiredSchema));


    //Multi-Field; Tree Valdiators
    this._validateFirstNameLastNameSame(path);
  });

  protected async saveProposal() {
    await submit(this.userForm, async (form) => {
      try {
        const response = await firstValueFrom(this.userService.addUser(form().value()));
      } catch (error) {
        return [{
          //field: this.userForm.firstName,
          kind: "server",
          message: "Fehler beim speichern."
        }]
      }
      return undefined;
    });
  }
}
