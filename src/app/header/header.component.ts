import {Component, OnInit} from '@angular/core';
import {first, map} from "rxjs/operators";
import {MealService} from "../services/meal/meal.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  origins;

  constructor(private mealService: MealService) {
  }

  ngOnInit() {
    this.mealService.fetchMealOriginData();
    this.mealService.getOrigins.pipe(first(), map((origins => {
      const array = [];
      origins.forEach(origin => array.push(origin['origin']));
      return array;
    }))).subscribe(origins => {
      this.origins = origins;
    });
  }

}
