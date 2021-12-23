import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  beginEditingIngredient = new Subject<number>();

  private _shoppingList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public getShoppingList(): Ingredient[] {
    return this._shoppingList.slice();
  }

  addToShoppingList(...ingredients: Ingredient[]): void {
    this._shoppingList.push(...ingredients);
    this.ingredientsChanged.next(this._shoppingList.slice());
  }

  getIngredient(index: number): Ingredient {
    return this._shoppingList[index];
  }

  editIngredient(index: number, newIngredient: Ingredient) {
    this._shoppingList[index] = newIngredient;
    this.ingredientsChanged.next(this._shoppingList.slice());
  }

  removeIngredient(index: number) {
    this._shoppingList.splice(index, 1);
    this.ingredientsChanged.next(this._shoppingList.slice());
  }

  clearShoppingList() {
    this._shoppingList = [];
    this.ingredientsChanged.next(this._shoppingList.slice());
  }
}
