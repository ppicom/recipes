import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import DataStorageService from '../shared/data-storage/data-storage.service';
import Recipe from './recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.recipes;

    if (recipes.length < 1) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
