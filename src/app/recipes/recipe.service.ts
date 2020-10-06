import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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
}