import { Component, signal } from '@angular/core';
import { apply, applyWhenValue, FormField, form, maxLength, minLength, required, schema, Schema } from '@angular/forms/signals';
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
    //OPTION 2
    applyWhenValue(path, user => !!user.lastName, (path) => {
      required(path.firstName, { message: "Firstname is required if Lastname is defined." });
    });

    applyWhenValue(path, user => !!user.firstName, (path) => apply(path.lastName, this._textSchema));
  });

  protected saveProposal() {
    console.log("saved");
  }
}
