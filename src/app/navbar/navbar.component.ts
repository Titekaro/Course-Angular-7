import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {MealService} from "../services/meal/meal.service";
import {first, map} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  showNavTabs = false;
  navTabsLinks;
  adminMode: boolean = false;
  adminModeSub: Subscription;
  origins;

  constructor(private authenticationService: AuthenticationService, private mealService: MealService) {
  }

  ngOnInit() {
    this.adminModeSub = this.authenticationService.user.subscribe(user => {
      this.adminMode = !!user;
    });
    this.mealService.fetchMealOriginData();
    this.mealService.getOrigins.pipe(first(), map((origins => {
      const array = [];
      origins.forEach(origin => array.push(origin['origin']));
      return array;
    }))).subscribe(origins => {
      this.origins = origins;
    });
  }

  toggleSubNav(links?: string[]) {
    this.showNavTabs = !this.showNavTabs;
    this.navTabsLinks = links;
  }

   signOut() {
    this.authenticationService.signOut();
  }

  ngOnDestroy() {
    if (this.adminModeSub) {
      this.adminModeSub.unsubscribe();
    }
  }
}
