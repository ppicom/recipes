import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import Recipe from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private _recipes: Recipe[] = [];

  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipe(index: number) {
    return this._recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addToShoppingList(...ingredients);
  }

  editRecipe(index: number, recipe: Recipe) {
    this._recipes[index] = recipe;
    this.recipesChanged.next(this._recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this._recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes.slice();
    this.recipesChanged.next(this._recipes.slice());
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this._recipes.slice());
  }
}
