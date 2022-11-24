import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService 
{  
  private _isAdmin = true;
  private _isLoggedIn = false;

  constructor() 
  {
    
  }

  get isAdmin(): boolean
  {
    return this._isAdmin;
  }

  get isLoggedIn(): boolean
  {
    return this._isLoggedIn;
  }

  login()
  {
    if(!this._isLoggedIn)
      this._isLoggedIn = true;
  }

  logOut()
  {
    if(this._isLoggedIn)
      this._isLoggedIn = false;
  }
}