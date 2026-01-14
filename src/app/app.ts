import { Component, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../data/users';

@Component({
  selector: 'app-root',
  imports: [FormField, MatInputModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  //Initales Signal definieren & typisieren
  protected readonly userSig = signal<User>({
    "firstName": "Markus",
    "lastName": "",
    "age": 0,
    "email": "",
    "username": "",
  });

  //Form initieren
  protected readonly userForm = form(this.userSig);

  protected saveProposal() {
    console.log("saved");
  }
}
