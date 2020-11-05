import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { ShoppingListComponent } from './shopping-list.component';


const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
