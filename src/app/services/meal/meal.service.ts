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
  meals: RecipeModel[];
  mealsWithOrigin: RecipeModel[];
  mealsChanged = new Subject<RecipeModel[]>();
  recipeChanged = new Subject<RecipeModel>();
  isLoading = new Subject<boolean>();
  getOrigins = new Subject<{}[]>();

  constructor(private http: HttpClient) {
  }

  /**
   * Return the list of all meals,
   * or just the list of meals with a specific origin.
   * @param origin
   */
  getMeals(origin?: string) {
    this.fetchRecipesData(origin);
    if (origin) {
      return this.mealsWithOrigin;
    } else {
      return this.meals;
    }
  }

  /**
   * Return the wanted recipe.
   * @param name
   */
  getRecipe(name: string) {
    return this.fetchRecipesData().find(meal => {
      return meal.name === name;
    });
  }

  addRecipe(recipe: RecipeModel) {
    return this.http.post<RecipeModel>(config.apiUrl + 'recipes.json', recipe);
  }

  updateRecipe(id: string, recipe: RecipeModel) {
    return this.http.patch<RecipeModel>(config.apiUrl + 'recipes/' + id + '.json', recipe);
  }

  removeRecipe(id: string) {
    this.http.delete(config.apiUrl + 'recipes/' + id + '.json').subscribe(() => {
    }, (error) => {
      console.log(error);
    }, () => {
      this.fetchRecipesData();
    });
  }

  fetchRecipesData(origin?: string) {
    this.http.get<RecipeModel[]>(config.apiUrl + 'recipes.json').pipe(
      map((meals: RecipeModel[]) => {
        const array = [];
        for (const key in meals) {
          array.push({...meals[key], id: key})
        }
        return array;
      })
    ).subscribe((recipes: RecipeModel[]) => {
      this.isLoading.next(true);

      if (origin) {
        this.mealsWithOrigin = recipes.filter(meal => {
          return meal.origin === origin;
        });
        this.mealsChanged.next(this.mealsWithOrigin);
      } else {
        this.meals = recipes;
        this.mealsChanged.next(this.meals);
      }
    }, () => {
      this.isLoading.next(false);
    }, () => {
      this.isLoading.next(false);
    });

    if (origin) {
      return this.mealsWithOrigin;
    } else {
      return this.meals;
    }
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
