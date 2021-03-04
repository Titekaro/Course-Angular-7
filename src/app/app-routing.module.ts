import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MealsComponent} from "./meals/meals.component";
import {MealListComponent} from "./meal-list/meal-list.component";
import {RecipeComponent} from "./recipe/recipe.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {AuthenticationGuard} from "./guards/authentication/authentication.guard";
import {MealResolverService} from "./services/meal/meal-resolver.service";
import {DashboardGuard} from "./guards/dashboard/dashboard.guard";

const appRoutes: Routes = [
  {path: '', component: MealsComponent},
  {path: 'meals', component: MealsComponent, children: [
      {path: ':origin', component: MealListComponent},
      {path: ':origin/:name', component: RecipeComponent, resolve: {meal: MealResolverService}}
  ]},
  {path: 'authentication', component: AuthenticationComponent, canActivate: [AuthenticationGuard]},
  {path: 'dashboard', canActivate: [DashboardGuard], loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
