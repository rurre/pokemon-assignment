import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService 
{  

  get IsAdmin(): boolean
  {
    return true;
  }

  constructor() 
  {
    
  }
}