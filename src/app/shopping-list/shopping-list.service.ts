import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private _list: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public get shoppingList(): Ingredient[] {
    return this._list.slice();
  }

  addToShoppingList(...ingredients: Ingredient[]): void {
    this._list.push(...ingredients);
    this.ingredientsChanged.next(this.shoppingList.slice());
  }
}
