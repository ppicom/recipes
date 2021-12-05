import { EventEmitter } from '@angular/core';
import Recipe from './recipe.model';

export class RecipesService {
  private _recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdoHmgejs70oFuD-AIijLJ-ccvKw7J21uuQ&usqp=CAU'
    ),
    new Recipe(
      'Super tasty',
      'Incredible and unbelievable',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdoHmgejs70oFuD-AIijLJ-ccvKw7J21uuQ&usqp=CAU'
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }
}
