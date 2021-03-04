import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard.component";
import {DashboardHomeComponent} from "./dashboard-home/dashboard-home.component";
import {DashboardRecipesComponent} from "./dashboard-recipes/dashboard-recipes.component";
import {FormRecipeComponent} from "../forms/form-recipe/form-recipe.component";
import {MealResolverService} from "../services/meal/meal-resolver.service";
import {OriginsResolverService} from "../services/meal/origins-resolver.service";
import {DashboardStatsComponent} from "./dashboard-stats/dashboard-stats.component";
import {MealsResolverService} from "../services/meal/meals-resolver.service";

const dashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'home', component: DashboardHomeComponent, resolve: {
          recipes: MealsResolverService,
        }
      },
      {path: 'recipes', component: DashboardRecipesComponent},
      {path: 'recipes/add', component: FormRecipeComponent, resolve: {
        origins: OriginsResolverService
      }},
      {
        path: 'recipes/edit', component: FormRecipeComponent, resolve: {
          recipe: MealResolverService,
          origins: OriginsResolverService
        }
      },
      {path: 'stats', component: DashboardStatsComponent, resolve: {
          recipes: MealsResolverService,
        }
      },
      {path: 'comments', component: DashboardHomeComponent, resolve: {
          recipes: MealsResolverService,
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class AppDashboardRoutingModule {

}
