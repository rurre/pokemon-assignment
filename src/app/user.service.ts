import { Injectable } from '@angular/core';

const adminKey = 'isAdmin';
const loggedInKey = 'isLoggedIn';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isAdmin!: boolean;
  private _isLoggedIn!: boolean;

  constructor() {
    //Is admin needs to be set manually once
    if (!localStorage.getItem(adminKey)) localStorage.setItem(adminKey, 'true');
    if (!localStorage.getItem(loggedInKey))
      localStorage.setItem(loggedInKey, 'false');
  }

  get isAdmin(): boolean {
    if (!this._isAdmin)
      this._isAdmin = localStorage.getItem('isAdmin') === 'true';
    return this._isAdmin;
  }

  get isLoggedIn(): boolean {
    if (!this._isLoggedIn)
      this._isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return this._isLoggedIn;
  }

  login() {
    if (this._isLoggedIn) return;

    this._isLoggedIn = true;
    localStorage.setItem(loggedInKey, 'true');
  }

  logOut() {
    if (!this._isLoggedIn) return;
    this._isLoggedIn = false;
    localStorage.setItem(loggedInKey, 'false');
  }
}
