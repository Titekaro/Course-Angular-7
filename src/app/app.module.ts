import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {MealsComponent} from './meals/meals.component';
import {HeaderComponent} from './header/header.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {SharedModule} from "./shared/shared.module";
import {MealModule} from "./meal-list/meal.module";
import {RecipeModule} from "./recipe/recipe.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MealsComponent,
    HeaderComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MealModule,
    RecipeModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {

}
