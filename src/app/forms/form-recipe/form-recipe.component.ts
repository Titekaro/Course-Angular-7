import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MealService} from "../../services/meal/meal.service";
import {RecipeModel} from "../../models/recipe.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styleUrls: ['./form-recipe.component.scss']
})
export class FormRecipeComponent implements OnInit, OnDestroy {
  difficulties = [
    'Easy',
    'Moderate',
    'Hard'
  ];
  types = [
    'Starter',
    'Soup',
    'Side dish',
    'Main course',
    'Dessert'
  ];
  origins;
  originSub: Subscription;
  recipeForm: FormGroup;
  recipe: RecipeModel;
  recipeName: string;
  isEditing = false;

  constructor(private route: ActivatedRoute, private router: Router, private mealService: MealService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['name']) {
        this.recipeName = params['name'];
        this.recipe = this.mealService.getRecipe(this.recipeName);
      }
      this.isEditing = params['name'] != null;
      this.initForm();
    });
    this.origins = this.mealService.fetchMealOriginData();
  }

  private initForm() {
    let recipeName = '';
    let recipeOrigin = '';
    let recipeType = '';
    let recipeDifficulty = '';
    let recipeImagePath = '';
    let recipeCookingTime = '';
    let recipeIngredients = new FormArray([]);
    let recipeDescription = '';

    if (this.isEditing) {
      recipeName = this.recipe.name;
      recipeOrigin = this.recipe.origin;
      recipeType = this.recipe.type;
      recipeDifficulty = this.recipe.difficulty;
      recipeImagePath = this.recipe.imagePath;
      recipeCookingTime = this.recipe.cookingTime;
      recipeDescription = this.recipe.description;

      if (this.recipe.ingredients.length > 0) {
        this.recipe.ingredients.forEach(ingredient => {
          recipeIngredients.push(
            new FormControl(ingredient, Validators.required)
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'origin': new FormControl(recipeOrigin, Validators.required),
      'type': new FormControl(recipeType, Validators.required),
      'difficulty': new FormControl(recipeDifficulty, Validators.required),
      'imagePath': new FormControl(recipeImagePath, [
        Validators.required,
        Validators.pattern('^.{1,}([.])([a-z.]{3,4})$')
      ]),
      'cookingTime': new FormControl(recipeCookingTime, [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]),
      'ingredients': recipeIngredients,
      'description': new FormControl(recipeDescription, Validators.required),
    })

  }

  private get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private onNewOrigin(origin) {
    this.mealService.postMealOriginData({origin});
    this.originSub = this.mealService.getOrigins.subscribe(origins => {
      this.origins = origins;
    });
  }

  private onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormControl(null, Validators.required)
    );
  }

  private onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private onSubmit() {
    if (!this.recipeForm.valid) {
      return;
    }
    if (this.isEditing) {
      this.mealService.updateRecipe(this.recipe.id, this.recipeForm.value);
    } else {
      this.mealService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  private onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route}).then();
  }

  ngOnDestroy() {
    if (this.originSub) {
      this.originSub.unsubscribe();
    }
  }

}
