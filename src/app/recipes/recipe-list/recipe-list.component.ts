import { Component, OnInit } from '@angular/core';
import Recipe from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdoHmgejs70oFuD-AIijLJ-ccvKw7J21uuQ&usqp=CAU'
    ),
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdoHmgejs70oFuD-AIijLJ-ccvKw7J21uuQ&usqp=CAU'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
