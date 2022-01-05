import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import Recipe from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private _recipes: Recipe[] = [
    new Recipe(
      'Porterhouse steak',
      'This is simply a steak',
      'https://st.depositphotos.com/1020804/1448/i/950/depositphotos_14480443-stock-photo-beef-steak.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Potatoes', 3)]
    ),
    new Recipe(
      'Spaghettis',
      'Incredible and unbelievable',
      'https://grecipes.s3.amazonaws.com/recipe_picture/1618081/uploads_20200204T2329Z_ace8a4529b49f9a2c4129e343e4fac2b_1576681061599.jpg',
      [new Ingredient('Pasta', 100), new Ingredient('Tomato sauce', 250)]
    ),
  ];

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

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this._recipes.slice());
  }
}
