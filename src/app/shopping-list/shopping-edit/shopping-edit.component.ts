import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  ingredientBeingEdited: Ingredient = null;
  indexOfIngredientBeingEdited: number = null;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription =
      this.shoppingListService.beginEditingIngredient.subscribe((index) => {
        this.editMode = true;
        this.indexOfIngredientBeingEdited = index;
        this.ingredientBeingEdited =
          this.shoppingListService.getIngredient(index);
        this.editForm.setValue({
          name: this.ingredientBeingEdited.name,
          amount: this.ingredientBeingEdited.amount,
        });
      });
  }

  onAddIngredient() {
    const ingredientName = this.editForm.value.name;
    const ingredientAmount = this.editForm.value.amount;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    if (this.editMode) {
      this.shoppingListService.editIngredient(
        this.indexOfIngredientBeingEdited,
        newIngredient
      );
      this.editMode = false;
      this.ingredientBeingEdited = null;
      this.indexOfIngredientBeingEdited = null;
    } else {
      this.shoppingListService.addToShoppingList(newIngredient);
    }

    this.editForm.reset();
  }

  onRemoveIngredient() {
    this.shoppingListService.removeIngredient(
      this.indexOfIngredientBeingEdited
    );
    this.editMode = false;
    this.ingredientBeingEdited = null;
    this.indexOfIngredientBeingEdited = null;
    this.editForm.reset();
  }

  onClearShoppingList() {
    this.shoppingListService.clearShoppingList();
  }
}
