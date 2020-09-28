import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  
  recipes: Recipe[] = [
    new Recipe('testNume', 'testDescription' , 'https://unsplash.it/1200/768.jpg?image=250')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
