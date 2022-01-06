import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import Recipe from '../../recipes/recipe.model';
import { RecipesService } from '../../recipes/recipes.service';

@Injectable({ providedIn: 'root' })
export default class DataStorageService {
  private readonly REST_API_URL = `https://recipes-d0f0a-default-rtdb.europe-west1.firebasedatabase.app`;

  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.recipes;
    this.http
      .put<Recipe[]>(`${this.REST_API_URL}/recipes.json`, recipes)
      .subscribe((data) => {
        console.log(data);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.REST_API_URL}/recipes.json`).pipe(
      map((recipes) => {
        return recipes.map(
          (r) => new Recipe(r.name, r.description, r.imagePath, r.ingredients)
        );
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
