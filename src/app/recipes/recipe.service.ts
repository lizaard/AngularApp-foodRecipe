import { Recipe } from './recipe.model';

export class RecipeService {
    recipes: Recipe[] = [
        new Recipe('testNume', 'testDescription' , 'https://unsplash.it/1200/768.jpg?image=250'),
        new Recipe('testNume', 'testDescription' , 'https://unsplash.it/1200/768.jpg?image=250')
      ];


      getRecipe() {
          return this.recipes.slice();
      }
}