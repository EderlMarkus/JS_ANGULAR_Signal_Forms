import { Component, signal } from '@angular/core';
import { apply, applyWhen, applyWhenValue, email, FormField, form, MAX_LENGTH, maxLength, MIN_LENGTH, minLength, required, schema, Schema, SchemaPath, validateTree } from '@angular/forms/signals';
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

  private readonly _textSchema: Schema<string> = schema((fieldPath) => {
    minLength(fieldPath, 3, { message: `Enter minimum 3 Characters` });
    maxLength(fieldPath, 50, { message: (ctx) => `Enter maximum ${ctx.fieldTree().maxLength?.()} Characters` });
    //apply(fieldPath, this._requiredSchema);
  });

  private readonly _requiredSchema: Schema<string> = schema((fieldPath) => {
    required(fieldPath, { message: (ctx) => `${ctx.fieldTree().keyInParent()} is required.` });
  })

  protected readonly userSig = signal<User>({
    "firstName": "Markus",
    "lastName": "Ederl",
    "age": "0",
    "email": "markus.eder@r-software.at",
    "username": "MarkusEderl",
  });

  protected readonly userForm = form(this.userSig, (path) => {
    //Für wiederkehrende Validatoren welche auf mehrere Felder angewendet werden soll
    //kann man ein Schema verwenden.
    apply(path.firstName, this._textSchema);
    apply(path.lastName, this._textSchema);

    email(path.email, { message: "Must be E-Mail" });

    //OPTION 1
    // required(path.firstName, {
    //   when: (ctx) => !!ctx.valueOf(path.lastName),
    //   message: "Firstname is required if Lastname was defined"
    // });

    // required(path.lastName, {
    //   when: (ctx) => !!ctx.valueOf(path.firstName),
    //   message: "Lastname is required if Firstname is defined"
    // })

    //OPTION 2
    // applyWhenValue(path, user => !!user.lastName, (path) => {
    //   required(path.firstName, { message: "Firstname is required if Lastname is defined." });
    // });
    // applyWhenValue(path, user => !!user.firstName, (path) => apply(path.lastName, this._textSchema));

    //OPTION 3
    // applyWhen(path, ctx => !!ctx.valueOf(path.firstName) && ctx.fieldTree()., (path) => apply(path.lastName, this._textSchema));
    // applyWhen(path, ctx => !!ctx.valueOf(path.lastName), (path) => apply(path.firstName, this._textSchema));


    //Multi-Field; Tree Valdiators
    validateTree(path, (ctx) => {
      const firstName = ctx.fieldTree.firstName().value();
      const lastName = ctx.fieldTree.lastName().value();

      if (!firstName || !lastName) return null;

      if (firstName === lastName) {
        return {
          kind: "same_names",
          message: "Firstname and Lastname must not be same",
          fieldTree: ctx.fieldTree.firstName,
          firstName,
          lastName
        }
      }
      return null;
    })
  });

  protected saveProposal() {
    console.log("saved");
  }
}
