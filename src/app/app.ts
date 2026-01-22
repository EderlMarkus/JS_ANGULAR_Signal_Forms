import { Component, inject, signal } from '@angular/core';
import { FormField, form, maxLength, minLength, provideSignalFormsConfig, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User, Users } from '../data/users';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [FormField, MatInputModule, MatButtonModule, MatFormFieldModule, MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private userService = inject(Users);
  private snackBar = inject(MatSnackBar);

  protected readonly userSig = signal<User>({
    "firstName": "Markus",
    "lastName": "Ederl",
    "age": "0",
    "email": "markus.ederl@raiffeisen-software.at",
    "username": "MarkusEderl",
  });



  protected readonly userForm = form(this.userSig, (path) => {
    required(path.firstName, { message: "Firstname is required." }),
      minLength(path.firstName, 3, { message: "Firstname must have at least 3 Characters." }),
      maxLength(path.firstName, 30, { message: "Firstname must not have more than 30 Characters." })
  });

  protected async saveProposal() {
    await submit(this.userForm, async (form) => {
      try {
        const response = await firstValueFrom(this.userService.addUser(form().value()));
        this.snackBar.open("User gespeichert", "OK");
      } catch (error) {
        this.snackBar.open("User nicht gespeichert", "OK");
        return [{
          fieldTree: form.firstName,
          kind: "server",
          message: "Fehler beim speichern."
        }]
      }
      return undefined;
    });
  }
}
