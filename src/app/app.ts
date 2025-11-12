import { Component, signal } from '@angular/core';
import { Control, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../data/users';

@Component({
  selector: 'app-root',
  imports: [Control, MatInputModule, MatButtonModule],
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

  protected readonly userForm = form(this.userSig);

  protected saveProposal() {
    console.log("saved");
  }
}
