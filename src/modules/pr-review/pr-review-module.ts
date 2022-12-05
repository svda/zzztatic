import { Context, Probot } from 'probot';
import { Module } from '../interfaces';
import { Recipe } from './recipes/interfaces';

import { distFilesRecipe } from './recipes/dist-files';

const getChanges = async (context: Context): Promise<string[]> => {
  const response = await context.octokit.pulls.listFiles();

  return response.data.map(({ filename }) => filename);
};

const createReview = async (context: Context): Promise<void> => {
  await context.octokit.rest.pulls.createReview();
};

const run = async (context: Context) => {
  const changes = getChanges(context);
  const results = await Promise.all(recipes.map((recipe) => recipe.run(context, changes)));
};

const recipes: Recipe[] = [distFilesRecipe];

export const prReviewModule: Module = {
  register: (app: Probot) => {
    app.on(['pull_request.opened', 'pull_request.reopened', 'pull_request.edited', 'pull_request.synchronize'], run);
  },
};
