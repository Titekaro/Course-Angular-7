import {Component, OnInit} from '@angular/core';
import {ChartData} from "../../chart/chart-data";
import {RecipeModel} from "../../models/recipe.model";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.route.snapshot.data['recipes'];

    this.origins = this.getStats(this.recipes, 'origin');
    this.difficulties = this.getStats(this.recipes, 'difficulty');
    this.types = this.getStats(this.recipes, 'type');
    this.ratings = this.getStats(this.recipes, 'comments');
  }

  /**
   * Return an array with the amount of key present in an array.
   * @param array
   * @param key
   */
  getStats(array, key: string) {
    const res = [];
    array.forEach(item => {
      console.log(item[key]);
      if (!this[item[key]]) {
        this[item[key]] = [item[key], 0];
        res.push(this[item[key]]);
      }
      this[item[key]][1]++
    });
    return res;
  }

}
