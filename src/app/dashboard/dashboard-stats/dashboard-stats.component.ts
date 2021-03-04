import {Component, OnInit} from '@angular/core';
import {ChartData} from "../../chart/chart-data";
import {RecipeModel} from "../../models/recipe.model";
import {ActivatedRoute} from "@angular/router";
import {StatsService} from "../../services/stats/stats.service";
import {MealService} from "../../services/meal/meal.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss']
})
export class DashboardStatsComponent implements OnInit {
  recipes: RecipeModel[];
  origins: [ChartData][];
  difficulties: [ChartData][];
  types: [ChartData][];
  ratings: [ChartData][];

  constructor(private route: ActivatedRoute, private statsService: StatsService, private mealService: MealService) {
  }

  ngOnInit() {
    if (!this.recipes) {
      this.recipes = this.route.snapshot.data['recipes'];
      this.mealService.mealsChanged.pipe(first()).subscribe((recipes: RecipeModel[]) => {
        this.recipes = recipes;
      });
    }

    this.origins = this.statsService.getStats(this.recipes, 'origin');
    this.difficulties = this.statsService.getStats(this.recipes, 'difficulty');
    this.types = this.statsService.getStats(this.recipes, 'type');
    this.ratings = this.statsService.getStats(this.recipes, 'comments');
  }

}
