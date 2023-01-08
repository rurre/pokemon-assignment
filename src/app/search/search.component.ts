import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('', [
    Validators.minLength(3),
    Validators.pattern('^[A-Za-z]+'),
  ]);
  errorMsg: string = '';

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  getErrorMessage(): string {
    if (this.searchControl.value == '') return 'Please enter a search term';
    if (this.searchControl.hasError('minlength'))
      return 'At least 3 characters required';
    if (this.searchControl.hasError('pattern'))
      return 'Only letters are allowed';

    return '';
  }

  trySearch(): void {
    this.errorMsg = this.getErrorMessage();
    if (this.errorMsg) return;

    this._router.navigate([
      `detail/${this.searchControl.value?.toLowerCase()}`,
    ]);
  }
}
