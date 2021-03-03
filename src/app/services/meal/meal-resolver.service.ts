import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MealService} from "./meal.service";
import {RecipeModel} from "../../models/recipe.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import * as config from '../../../../config.json';

@Injectable({
  providedIn: "root"
})
export class MealResolverService implements Resolve<RecipeModel> {
  meal: RecipeModel;
  mealName: string;

  constructor(private mealService: MealService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RecipeModel> | Promise<RecipeModel> | RecipeModel {
    this.mealName = route.paramMap.get('name');

    return this.mealService.fetchRecipes().pipe(
      map((meals: RecipeModel[]) => {
        for (const key in meals) {
          if (meals[key].name === this.mealName) {
            this.meal = {...meals[key], id: key};
          }
        }
        return this.meal;
      })
    );

  }
}
