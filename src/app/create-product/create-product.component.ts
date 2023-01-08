import { Router } from '@angular/router';
import { ProductStorageService } from './../product-storage.service';
import { regexNumbersAndCharacters, regexNumbers } from './../constants';
import { PokemonProduct } from './../pokemon-product';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormArray,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  mainForm!: FormGroup<any>;
  product!: PokemonProduct;

  maxForms: number = 5;

  constructor(
    private _storage: ProductStorageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      products: new FormArray([this._createForm()]),
    });
  }

  get productsArray(): FormArray {
    return this.mainForm.controls['products'] as FormArray;
  }

  addForm(): void {
    if (this.canAddForm) this.productsArray.push(this._createForm());
  }

  removeLastForm(): void {
    this.productsArray.removeAt(this.productsArray.controls.length - 1);
  }

  removeFormAtIndex(index: number): void {
    this.productsArray.removeAt(index);
  }

  get canAddForm(): boolean {
    return this.productsArray.controls.length < this.maxForms;
  }

  private _createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.product?.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(regexNumbersAndCharacters),
      ]),
      description: new FormControl(this.product?.description, [
        Validators.required,
        Validators.minLength(3),
      ]),
      price: new FormControl(this.product?.price, [
        Validators.required,
        Validators.pattern(regexNumbers),
      ]),
      category: new FormControl(this.product?.category, [Validators.required]),
      imageUrl: new FormControl(this.product?.imageUrl, [Validators.required]),
      phoneNumber: new FormControl(this.product?.phoneNumber, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(regexNumbers),
      ]),
      select: new FormControl(this.product?.select),
    });
  }

  get formIsValid(): boolean {
    if (this.productsArray.controls.length == 0 || this.mainForm.invalid)
      return false;
    return true;
  }

  resetForm(): void {
    this.productsArray.clear();
    this.productsArray.push(this._createForm());
  }

  saveAll(): void {
    this._storage.addToStorage(this.productsArray.value);
    this._router.navigate(['/home']);
  }
}
