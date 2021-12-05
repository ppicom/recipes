import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private _list: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public get shoppingList(): Ingredient[] {
    return this._list.slice();
  }

  addToShoppingList(ingredient: Ingredient): void {
    this._list.push(ingredient);
    this.ingredientsChanged.emit(this.shoppingList.slice());
  }
}
