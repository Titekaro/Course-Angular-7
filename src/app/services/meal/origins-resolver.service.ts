import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MealService} from "./meal.service";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import * as config from '../../../../config.json';

@Injectable({
  providedIn: "root"
})
export class OriginsResolverService implements Resolve<any[]> {
  origins: any[];

  constructor(private mealService: MealService, private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> | Promise<any[]> | any[] {
    this.origins = [];

    return this.http.get(config.apiUrl + 'origins.json').pipe(
      map(origins => {
        for (const key in origins) {
          this.origins.push({...origins[key], id: key})
        }
        return this.origins;
      })
    );
  }
}
