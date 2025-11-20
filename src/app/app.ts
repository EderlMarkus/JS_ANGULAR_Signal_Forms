import { Component, signal } from '@angular/core';
import { apply, applyWhenValue, Field, form, MAX_LENGTH, maxLength, MIN_LENGTH, minLength, required, schema, Schema } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [Field, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private readonly _textSchema: Schema<string> = schema((fieldPath) => {
    required(fieldPath, { message: 'This Field is required' });
    minLength(fieldPath, 3, { message: (ctx) => `Enter minimum ${ctx.field().minLength?.()} Characters` });
    maxLength(fieldPath, 50, { message: (ctx) => `Enter maximum ${ctx.field().maxLength?.()} Characters` });
  });

  protected readonly userSig = signal<User>({
    "firstName": "Markus",
    "lastName": "Ederl",
    "age": "0",
    "email": "markus.eder@r-software.at",
    "username": "MarkusEderl",
  });

  protected readonly userForm = form(this.userSig, (path) => {
    apply(path.firstName, this._textSchema);
    apply(path.lastName, this._textSchema);

    applyWhenValue(path, (ctx) => !!ctx.firstName, (path) => {
      required(path.lastName, { message: "Lastname is required." });
    });

    applyWhenValue(path, (ctx) => !!ctx.lastName, (path) => {
      required(path.firstName, { message: "Firstname is required." });
    });

  });

  protected saveProposal() {
    console.log("saved");
  }
}
