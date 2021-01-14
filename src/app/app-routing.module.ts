import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MealsComponent} from "./meals/meals.component";
import {MealListComponent} from "./meal-list/meal-list.component";
import {MealRecipeComponent} from "./meal-recipe/meal-recipe.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const appRoutes: Routes = [
  {path: '', component: MealsComponent},
  {path: 'meals', component: MealsComponent, children: [
    {path: ':category', component: MealListComponent},
    {path: ':category/:name', component: MealRecipeComponent}
  ]},
  {path: 'authentication', component: AuthenticationComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
