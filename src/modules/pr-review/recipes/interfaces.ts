import { Context } from 'probot';

export type RecipeResult = {};

export type Recipe = {
  run: (context: Context, changes: any) => RecipeResult;
};
