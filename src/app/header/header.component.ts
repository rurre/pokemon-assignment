import { ProductStorageService } from './../product-storage.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _storage: ProductStorageService
  ) {}

  ngOnInit(): void {}

  get isAdmin(): boolean {
    return this._userService.isAdmin;
  }

  get isLoggedIn(): boolean {
    return this._userService.isLoggedIn;
  }

  logIn() {
    this._userService.login();
  }

  logOut() {
    this._userService.logOut();
  }

  get hasProducts(): boolean {
    return this._storage.hasProducts;
  }
}
