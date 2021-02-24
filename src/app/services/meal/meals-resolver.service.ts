import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MealService} from "./meal.service";
import {RecipeModel} from "../../models/recipe.model";

@Injectable({
  providedIn: "root"
})
export class MealsResolverService implements Resolve<RecipeModel[]> {

  constructor(private mealService: MealService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    return this.mealService.fetchRecipes();
  }
}
