import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit
{
  message: string = "404 - Page not found D:";

  constructor() { }

  ngOnInit(): void
  {
  }
}
