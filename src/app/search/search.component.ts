import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit 
{  
  searchFormControl = new FormControl('', [Validators.pattern("[a-zA-Z]"), Validators.minLength(3)]);
  value: string = "";

  constructor() 
  {

  }

  ngOnInit(): void 
  {
  }

  doSearch()
  {
    console.log("Searching for " + this.value);
  }
}
