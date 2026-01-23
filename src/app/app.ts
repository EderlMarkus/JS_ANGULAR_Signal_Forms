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
    apply(fieldPath, this._requiredSchema);
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
  });

  protected saveProposal() {
    console.log("saved");
  }
}
