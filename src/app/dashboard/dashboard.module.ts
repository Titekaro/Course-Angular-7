import {NgModule} from '@angular/core';
import {MealModule} from "../meal-list/meal.module";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecipeModule} from "../recipe/recipe.module";

import {AppDashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {DashboardRecipesComponent} from "./dashboard-recipes/dashboard-recipes.component";
import {DashboardSidenavComponent} from './dashboard-sidenav/dashboard-sidenav.component';
import {FormRecipeComponent} from "../forms/form-recipe/form-recipe.component";
import {ModalRecipeComponent} from "../modals/modal-recipe/modal-recipe.component";
import {ChartComponent} from "../chart/chart.component";
import {DashboardStatsComponent} from "./dashboard-stats/dashboard-stats.component";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardRecipesComponent,
    DashboardSidenavComponent,
    FormRecipeComponent,
    ModalRecipeComponent,
    ChartComponent,
    DashboardStatsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MealModule,
    SharedModule,
    RecipeModule,
    AppDashboardRoutingModule,
  ],
  entryComponents: [ModalRecipeComponent]
})
export class DashboardModule {
}
