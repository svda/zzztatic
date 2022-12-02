import { Probot } from 'probot';
import prCommentRecipe from './recipes/pr-label';

type Recipe = {
  register: (app: Probot) => void;
};

const recipes: Recipe[] = [prCommentRecipe];

export default (app: Probot) => {
  recipes.forEach((recipe) => recipe.register(app));
};
