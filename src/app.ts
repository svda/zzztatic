import { Probot } from 'probot';
import { Recipe } from './recipes/interfaces';
import prCommentRecipe from './recipes/pr-comment';

const recipes: Recipe[] = [prCommentRecipe];

export default (app: Probot) => {
  recipes.forEach((recipe) => recipe.register(app));
};
