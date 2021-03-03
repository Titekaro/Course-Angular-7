import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MealService} from "../services/meal/meal.service";
import {RecipeModel} from "../models/recipe.model";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit, OnDestroy {
  @Input() editMode = false;
  @Output() mealData = new EventEmitter<boolean>();

  meals: RecipeModel[];
  mealOrigin: string;
  mealChangedSub: Subscription;
  isLoading: boolean;

  constructor(private route: ActivatedRoute, private mealService: MealService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mealOrigin = params['origin'];
      this.mealData.emit(true);

      this.mealService.fetchRecipes(this.mealOrigin).pipe(first()).subscribe((recipes: RecipeModel[]) => {
        this.isLoading = true;
        this.meals = recipes;
      }, (error) => {
        console.log(error);
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    });


    this.mealChangedSub = this.mealService.mealsChanged.subscribe((meals: RecipeModel[]) => {
      this.meals = meals;
    });
  }

  ngOnDestroy() {
    if (this.mealChangedSub) {
      this.mealChangedSub.unsubscribe();
    }
  }

}
