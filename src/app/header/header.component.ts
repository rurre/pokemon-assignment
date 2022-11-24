import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{
  isAdmin: boolean;

  constructor(private _userService: UserService) 
  {
    this.isAdmin = this._userService.IsAdmin;
  }

  ngOnInit(): void 
  {
    
  }
}
