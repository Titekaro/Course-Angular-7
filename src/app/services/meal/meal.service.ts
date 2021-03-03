import {RecipeModel} from "../../models/recipe.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import * as config from "../../../../config.json";

@Injectable({
  providedIn: 'root'
})
export class MealService {
  mealsChanged = new Subject<RecipeModel[]>();
  recipeChanged = new Subject<RecipeModel>();
  getOrigins = new Subject<{}[]>();

  constructor(private http: HttpClient) {
  }

  addRecipe(recipe: RecipeModel) {
    return this.http.post<RecipeModel>(config.apiUrl + 'recipes.json', recipe);
  }

  updateRecipe(id: string, recipe: RecipeModel) {
    return this.http.patch<RecipeModel>(config.apiUrl + 'recipes/' + id + '.json', recipe);
  }

  removeRecipe(id: string) {
    return this.http.delete(config.apiUrl + 'recipes/' + id + '.json');
  }

  fetchRecipes(origin?: string) {
    return this.http.get<RecipeModel[]>(config.apiUrl + 'recipes.json').pipe(
      map((meals: RecipeModel[]) => {
        let array = [];
        for (const key in meals) {
          array.push({...meals[key], id: key})
        }

        if (origin) {
          array = array.filter(meal => {
            return meal.origin === origin;
          });
        }
        return array;
      })
    );
  }

  /**
   * Get a list of existing origins in database.
   * @Todo we could get this in meals and create an array of origins, instead of have annother json in database.
   */
  fetchMealOriginData() {
    this.http.get(config.apiUrl + 'origins.json').pipe(map(origins => {
      const array = [];
      for (const key in origins) {
        array.push({...origins[key], id: key})
      }
      return array;
    })).subscribe(origins => {
      this.getOrigins.next(origins);
    }, (error) => {
      console.log(error);
    }, () => {
    });
  }

  /**
   * Add a new origin in database.
   * @param origin
   */
  postMealOriginData(origin: object) {
    this.http.post<object>(config.apiUrl + 'origins.json', origin).subscribe(() => {
    }, (error) => {
      console.log(error);
    }, () => {
      this.fetchMealOriginData();
    });
  }
}
