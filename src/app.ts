import { Probot } from 'probot';

import { prReviewModule } from './modules/pr-review/pr-review-module';
import { distFilesRecipe } from './modules/pr-review/recipes/dist-files';

export default (app: Probot) => {
  prReviewModule.register(app, { recipes: [distFilesRecipe] });
};
