import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('testNume', 'testDescription' , 'https://unsplash.it/1200/768.jpg?image=250',[
            new Ingredient('Meat',1),
            new Ingredient('Ceva',20),

        ]),
        new Recipe('testNume', 'testDescription' , 'https://unsplash.it/1200/768.jpg?image=250',[
            new Ingredient('FASSS',2),
            new Ingredient('FASSSuuuuuu',20),
        ])
      ];

      constructor(private slService: ShoppingListService){

      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}